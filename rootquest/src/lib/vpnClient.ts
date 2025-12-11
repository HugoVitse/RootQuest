import { vpnResponse } from "../types/vpn";
// sftp client (pour get/mkdir)
import SSH2Promise from 'ssh2-sftp-client';
// ssh client pour exec
import { Client as SSHClient } from 'ssh2';
import fs from 'fs';
import path from 'path';

// Variables d'environnement pour la connexion SSH
const VPN_IP = process.env.VPN_PUBLIC_IP!;
const VPN_USER = process.env.VPN_ADMIN_USER || 'vpnadmin';
const SSH_KEY_PATH = process.env.SSH_KEY_PATH || ''; // Peut être chemin ou contenu

// Chemin où le script sera exécuté sur la VM
const REMOTE_SCRIPT_PATH = '/home/vpnadmin/vm_renew_certificate.sh';
const REMOTE_USER_PROFILE_DIR = '/mnt/openvpn-share/userProfiles'; // Le dossier sur le File Share

// Lire le contenu de la clé privée. Acceptons soit le chemin (fichier) soit la clé elle-même dans l'ENV.
function loadPrivateKey(): string {
    if (!SSH_KEY_PATH) {
        throw new Error('SSH_KEY_PATH is not set');
    }

    // Si le chemin existe en tant que fichier, lire le contenu
    try {
        if (fs.existsSync(SSH_KEY_PATH) && fs.statSync(SSH_KEY_PATH).isFile()) {
            return fs.readFileSync(SSH_KEY_PATH, 'utf8');
        }
    } catch (e) {
        // ignore and treat SSH_KEY_PATH as key content
    }

    // Sinon on considère que la variable contient déjà la clé
    return SSH_KEY_PATH;
}


// Exécute le script sur la VM via SSH (exec) puis retourne la sortie (chemin du .ovpn)
async function executeRemoteScript(username: string): Promise<string> {
    const privateKey = loadPrivateKey();
    const conn = new SSHClient();

    return new Promise<string>((resolve, reject) => {
        let stdout = '';
        let stderr = '';

        conn.on('ready', () => {
            const command = `sudo sh ${REMOTE_SCRIPT_PATH} ${username}`;
            conn.exec(command, { pty: true }, (err, stream) => {
                if (err) {
                    conn.end();
                    return reject(err);
                }

                stream.on('close', (code: number, signal: string) => {
                    conn.end();
                    if (code !== 0) {
                        return reject(new Error(`Remote script exited with code ${code}: ${stderr}`));
                    }
                    return resolve(stdout.trim());
                }).on('data', (data: Buffer) => {
                    stdout += data.toString();
                }).stderr.on('data', (data: Buffer) => {
                    stderr += data.toString();
                });
            });
        }).on('error', (err) => {
            reject(err);
        }).connect({
            host: VPN_IP,
            port: 22,
            username: VPN_USER,
            privateKey,
        });
    });
}

// src/lib/vpnClient.ts

const VPN_PUBLIC_IP = process.env.VPN_PUBLIC_IP; // IP du VNet (10.0.1.x)
const API_SECRET = process.env.VPN_API_KEY || "";

export async function createVpnClient(username : string) : Promise<vpnResponse> {
    const url = `http://${VPN_PUBLIC_IP}:80/renew/${username}`;
    console.log(url)
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'X-API-Key': API_SECRET,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data)

        if (!data.success) {
            throw new Error(`API error: ${data.message}`);
        }
        
        // Retourne le chemin du fichier qui est ensuite lu par le SDK Storage
        return { success: true, message: data.path };

    } catch (error) {
        // ... gestion des erreurs
        return { success:false, message: "tg"}
    }
}