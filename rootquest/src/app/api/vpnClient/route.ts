// src/app/api/vpnClient/route.ts

import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { vpnResponse } from "@/types/vpn";
import { createVpnClient } from "@/lib/vpnClient";

// --- NOUVEAUX IMPORTS POUR L'ACCÈS AU STORAGE FILE SHARE ---
import { ShareServiceClient, StorageSharedKeyCredential } from '@azure/storage-file-share';
import { streamToBuffer } from '@/lib/utils'; // Assurez-vous d'avoir une fonction streamToBuffer (voir ci-dessous)
// -------------------------------------------------------------

// --- Variables d'environnement pour l'accès au File Share ---
// ⚠️ ATTENTION: Ces clés sont sensibles. Key Vault est la meilleure solution !
const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME!; // Ex: rootquestdevst
const STORAGE_KEY = process.env.AZURE_STORAGE_KEY_SECRET!; // Clé primaire du Storage
const SHARE_NAME = process.env.STORAGE_SHARE_NAME || "openvpn-data"; // Le nom du partage
const USER_PROFILES_DIR = "userProfiles"; // Le dossier dans le partage créé par le script VPN
// -------------------------------------------------------------

export async function GET(req: NextRequest) {
    
    try {
        const token = req.cookies.get("session")?.value;
        
        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized: Missing session token" }, { status: 401 });
        }
        
        const decrypted = await decrypt(token);
        if (typeof decrypted === 'string' || !decrypted.username) {
            return NextResponse.json({ success: false, message: "Unauthorized: Invalid session" }, { status: 401 });
        }
        const username: string = decrypted.username; // ✅ On utilise le username du cookie

        // 1. DÉCLENCHEMENT DU SCRIPT À DISTANCE (Via SSH, c'est l'étape que nous gardons pour l'instant)
        // La fonction createVpnClient (qui utilise SSH en interne) exécute le script sur la VM
        // Ce script DOIT créer le fichier ET retourner son CHEMIN DISTANT.
        const rep: vpnResponse = await createVpnClient(username);
        
        if (!rep.success) {
            console.error("Erreur lors de la création du client VPN:", rep.message);
            throw new Error(`Erreur VPN: ${rep.message}`);
        }
        
        // Le script VPN a réussi à générer le fichier sur le File Share.
        const fileName = `${username}.ovpn`;

        // 2. ACCÈS AU FICHIER DIRECTEMENT VIA AZURE FILE SHARE
        const credential = new StorageSharedKeyCredential(
            STORAGE_ACCOUNT_NAME,
            STORAGE_KEY
        );

        const shareServiceClient = new ShareServiceClient(
            `https://${STORAGE_ACCOUNT_NAME}.file.core.windows.net`,
            credential
        );

        const directoryClient = shareServiceClient.getShareClient(SHARE_NAME)
            .getDirectoryClient(USER_PROFILES_DIR); 

        const fileClient = directoryClient.getFileClient(fileName);

        // Télécharger le contenu du fichier
        const downloadResponse = await fileClient.download();

        if (!downloadResponse.readableStreamBody) {
             throw new Error(`Le fichier ${fileName} est vide ou inaccessible.`);
        }
        
        // Lire le contenu du flux (besoin d'un helper streamToBuffer)
        const fileContent = await streamToBuffer(downloadResponse.readableStreamBody!);

        // 3. RÉPONSE
        const response = new NextResponse(fileContent as BodyInit, {
            headers: {
                'Content-Type': 'application/x-openvpn-profile',
                'Content-Disposition': `attachment; filename="${fileName}"`,
            },
        });

        return response;

    } catch (error: unknown) {   
        console.error("Erreur dans la route GET VPN:", error);
        
        // Pas de connexion SFTP à fermer ! C'est plus propre.
        
        return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
    }
}