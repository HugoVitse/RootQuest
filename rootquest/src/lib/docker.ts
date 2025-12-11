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
const IDENTITY_ID = process.env.CHALLENGE_IDENTITY_ID || "";
// ⚠️ NOUVEAU : ID du sous-réseau "challenges-subnet" (Voir section suivante)
const SUBNET_ID = process.env.AZURE_SUBNET_ID || ""; 
console.log(`DEBUG: Subnet ID is: '${SUBNET_ID}'`); // Vérifie si c'est vide
console.log(`DEBUG: Identity ID is: '${IDENTITY_ID}'`);
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
        const [rows] = await pool.query<ImageRow[]>(querySelectImages, [image]);
        if (rows.length === 0) throw new Error('Challenge image not found');
        const flagCount = rows[0].flags.length;
        
        const containerName = sanitizeName(`${image}-${username}`);

        // Vérification existant
        

        const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID!;
        const resourceGroup = process.env.AZURE_RESOURCE_GROUP!;
        const location = process.env.AZURE_LOCATION || "switzerlandnorth";
        const subnetId = process.env.AZURE_SUBNET_ID!; // L'ID complet du subnet
        const acrServer = process.env.ACR_LOGIN_SERVER!; // ex: monacr.azurecr.io

        // ATTENTION : L'ID complet de la ressource Identité (avec les majuscules correctes)
        // ex: /subscriptions/.../resourceGroups/.../providers/Microsoft.ManagedIdentity/userAssignedIdentities/MyIdentity
        const identityResourceId = process.env.CHALLENGE_IDENTITY_ID!.trim(); 

        console.log(identityResourceId)

        // 2. Authentification SDK
        const credential = new DefaultAzureCredential();
        const client = new ContainerInstanceManagementClient(credential, subscriptionId);

        // 3. Nom du conteneur
        const fullImageTag = `${acrServer}/${image}:latest`;

        try {
            const existing = await client.containerGroups.get(RESOURCE_GROUP, containerName);
            if (existing.ipAddress?.ip) {
                return { ip: existing.ipAddress.ip, success: true, nbflags: flagCount, message: "Running" };
            }
        } catch (e: any) { if (e.statusCode !== 404) throw e; }

        console.log(`Lancement SDK de ${containerName} depuis ${fullImageTag}...`);

        // 4. Création via le SDK (Le SDK gère la structure JSON pour toi)
        // Note: beginCreateOrUpdate attend que le déploiement commence (ou finisse selon la config)
        const result = await client.containerGroups.beginCreateOrUpdateAndWait(
            resourceGroup,
            containerName,
            {
            location: location,
            osType: "Linux",
            restartPolicy: "Never",
            
            // --- A. Configuration de l'Identité Managed ---
            identity: {
                type: "UserAssigned",
                userAssignedIdentities: {
                    // Syntaxe dynamique pour utiliser la variable comme clé
                    [identityResourceId]: {} 
                }
            },

            // --- B. Configuration Réseau (VNET) ---
            // Le subnetIds se met à la racine, pas dans ipAddress
            subnetIds: [
                { id: subnetId }
            ],
            ipAddress: {
                type: "Private", // Private car on est dans un VNet
                ports: [{ protocol: "TCP", port: 80 }],
            },

            // --- C. Credentials pour l'ACR ---
            imageRegistryCredentials: [
                {
                    server: acrServer,
                    // Le SDK saura mapper ça correctement dans le JSON final
                    identity: identityResourceId 
                }
            ],

            // --- D. Le Conteneur ---
            containers: [
                {
                name: containerName, // Le nom interne du conteneur
                image: fullImageTag,
                resources: { requests: { cpu: 1.0, memoryInGB: 1.5 } },
                ports: [{ port: 80 }],
                },
            ],
            }
        );

        console.log("Container déployé avec succès. IP:", result.ipAddress?.ip);

        return {
            success: true,
            message: "Started",
            nbflags:flagCount,
            ip: result.ipAddress?.ip || ""
        };

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