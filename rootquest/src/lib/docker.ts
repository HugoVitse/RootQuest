import { DefaultAzureCredential } from "@azure/identity";
import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { pool } from '@/db';
import { DockerResponse, IpResponse } from "../types/docker";
import { ImageRow } from "@/types/image";

// Configuration
const SUBSCRIPTION_ID = process.env.AZURE_SUBSCRIPTION_ID || "";
const RESOURCE_GROUP = process.env.AZURE_RESOURCE_GROUP || "";
const LOCATION = process.env.AZURE_LOCATION || "switzerlandnorth";
const ACR_SERVER = process.env.ACR_LOGIN_SERVER || ""; // ex: rootquestdevacr.azurecr.io
const ACR_USER = process.env.ACR_USERNAME || "";
const ACR_PASS = process.env.ACR_PASSWORD || "";
// ⚠️ NOUVEAU : ID du sous-réseau "challenges-subnet" (Voir section suivante)
const SUBNET_ID = process.env.AZURE_SUBNET_ID || ""; 

// Client Azure (Authentification automatique via Managed Identity ou CLI en local)
const credential = new DefaultAzureCredential();
const client = new ContainerInstanceManagementClient(credential, SUBSCRIPTION_ID);

// Utilitaire pour nettoyer le nom du conteneur (Azure est strict : minuscules, chiffres, tirets)
function sanitizeName(name: string): string {
    return name.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
}

export async function containerExists(image: string): Promise<boolean> {
    // Note: image ici est en fait le nom du défi
    const containerName = sanitizeName(image);
    try {
        await client.containerGroups.get(RESOURCE_GROUP, containerName);
        return true;
    } catch (e: any) {
        if (e.statusCode === 404) return false; // N'existe pas
        throw e; // Autre erreur
    }
}

export async function startContainer(image: string, username: string): Promise<DockerResponse> {
    const querySelectImages = `SELECT * FROM images WHERE image = ?`;

    try {
        // 1. Vérification BDD
        const [rows] = await pool.query<ImageRow[]>(querySelectImages, [image]);
        if (rows.length === 0) throw new Error('Challenge image not found in database');
        
        const imageRow = rows[0];
        const flagCount = imageRow.flags.length;
        
        // Nom unique : challenge-username
        const containerName = sanitizeName(`${image}-${username}`);

        // 2. Vérifier si le conteneur tourne déjà
        try {
            const existing = await client.containerGroups.get(RESOURCE_GROUP, containerName);
            if (existing.ipAddress?.ip) {
                return { 
                    ip: existing.ipAddress.ip, 
                    success: true, 
                    nbflags: flagCount, 
                    message: "Container already running" 
                };
            }
        } catch (e: any) {
            // S'il n'existe pas (404), on continue. Sinon on lance l'erreur.
            if (e.statusCode !== 404) throw e;
        }

        // 3. Création du conteneur sur Azure (ACI)
        console.log(`Starting ACI: ${containerName} with image ${ACR_SERVER}/${image}:latest`);

        const containerGroup = await client.containerGroups.beginCreateOrUpdateAndWait(RESOURCE_GROUP, containerName, {
            location: LOCATION,
            containers: [{
                name: containerName,
                image: `${ACR_SERVER}/${image}:latest`, // On assume que l'image est dans ton ACR
                resources: {
                    requests: { cpu: 1, memoryInGB: 1.5 }
                },
                ports: [{ port: 80 }] // Port exposé par le conteneur interne
            }],
            osType: "Linux",
            restartPolicy: "Never", // On ne redémarre pas si le joueur crash le truc
            imageRegistryCredentials: [{
                server: ACR_SERVER,
                username: ACR_USER,
                password: ACR_PASS
            }],
            // --- C'est ICI que se joue l'isolation réseau ---
            ipAddress: {
                type: "Private", // ⚠️ PRIVÉ !
                ports: [{ port: 80, protocol: "TCP" }],
                subnetIds: [{ id: SUBNET_ID }] // On l'injecte dans le subnet challenges
            }
        });

        const ip = containerGroup.ipAddress?.ip || "";
        return { ip, success: true, nbflags: flagCount, message: "Container started" };

    } catch (error: unknown) {
        console.error("Error starting container:", error);
        const msg = error instanceof Error ? error.message : "Unknown error";
        return { ip: "", success: false, nbflags: 0, message: msg };
    }
}

export async function stopContainer(image: string, username: string): Promise<DockerResponse> {
    const containerName = sanitizeName(`${image}-${username}`);

    try {
        // On vérifie d'abord s'il existe pour éviter une erreur inutile
        try {
            await client.containerGroups.get(RESOURCE_GROUP, containerName);
        } catch (e: any) {
            if (e.statusCode === 404) throw new Error("Container not started");
            throw e;
        }

        // Suppression
        await client.containerGroups.beginDeleteAndWait(RESOURCE_GROUP, containerName);
        
        return { ip: "", success: true, message: "Stopped", nbflags: 0 };

    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Error";
        return { ip: "", success: false, message: msg, nbflags: 0 };
    }
}

export async function getContainerIp(image_name: string): Promise<IpResponse> {
    // Attention: ici image_name doit être le containerName complet (ex: web1-user123)
    const containerName = sanitizeName(image_name);
    try {
        const group = await client.containerGroups.get(RESOURCE_GROUP, containerName);
        return { ip: group.ipAddress?.ip || "" };
    } catch {
        return { ip: "" };
    }
}