#!/bin/bash
set -euo pipefail



VPN_IP="${vpn_ip}"
STORAGE_ACCOUNT="${storage_account_name}"
STORAGE_KEY="${storage_account_key}"
# use a fixed default port to avoid Terraform template interpolation issues
OPENVPN_PORT="1194"
# fixed easy-rsa passphrase (change if you want to pass this via terraform)
EASYRSA_PASSIN="hugo"
OVPN_SHARE="//$STORAGE_ACCOUNT.file.core.windows.net/openvpn-data"
MOUNT_POINT="/mnt/openvpn-share"

sudo umount "$MOUNT_POINT" || true

echo "iptables-persistent iptables-persistent/autosave_v4 boolean true" | debconf-set-selections
echo "iptables-persistent iptables-persistent/autosave_v6 boolean true" | debconf-set-selections
# 1) Installer prérequis
apt-get update
apt-get install -y --no-install-recommends ca-certificates curl gnupg lsb-release apt-transport-https software-properties-common cifs-utils iptables-persistent

# Install Docker (simple method)
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

# Make sure docker-compose is available (docker compose plugin)
if ! docker compose version >/dev/null 2>&1; then
  apt-get install -y -qq docker-compose-plugin
fi

# 2) Mount Azure File Share
mkdir -p "$MOUNT_POINT/userProfiles"
chmod 0777 "$MOUNT_POINT"
# try mount (use storage key)
mount -t cifs "$OVPN_SHARE" "$MOUNT_POINT" -o vers=3.0,username="$STORAGE_ACCOUNT",password="$STORAGE_KEY",dir_mode=0777,file_mode=0777,serverino || true

# Persist in fstab so it remounts after reboot
grep -q "$OVPN_SHARE" /etc/fstab || {
  echo "$OVPN_SHARE $MOUNT_POINT cifs vers=3.0,username=$STORAGE_ACCOUNT,password=$STORAGE_KEY,dir_mode=0777,file_mode=0777,serverino 0 0" >> /etc/fstab
}

# 3) Create/openvpn data volume dir under the file share (the Docker image uses /etc/openvpn)
mkdir -p "$MOUNT_POINT/openvpn-data"
chown root:root "$MOUNT_POINT/openvpn-data"
chmod 0777 "$MOUNT_POINT/openvpn-data"

# 3.a) Deploy helper script vm_renew_certificate.sh so the App Service can trigger it remotely
# This creates /home/vpnadmin/vm_renew_certificate.sh and makes it executable.
cat > /home/vpnadmin/vm_renew_certificate.sh <<'VM_RENEW'
#!/bin/bash
# vm_renew_certificate.sh
# Ce script est exécuté sur la VM VPN par l'App Service

MOUNT_POINT="/mnt/openvpn-share"

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <username>"
  exit 1
fi

ARG_USER=$1
set -euo pipefail

# Host-side directory where we store OpenVPN data (mounted from Azure File Share)
# This must match the mount point created by the install script / cloud-init
OVPN_DATA_DIR=$MOUNT_POINT/openvpn-data
OVPN_IMAGE="kylemanna/openvpn"
EASYRSA_PASSIN="hugo"

# ensure mount points exist
mkdir -p $MOUNT_POINT/userProfiles
mkdir -p "$OVPN_DATA_DIR"
chown root:root $MOUNT_POINT || true

# 1. Révocation de l'ancien certificat
echo "Révocation de $${ARG_USER}..."
CERT_PATH="$OVPN_DATA_DIR/pki/issued/$ARG_USER.crt"

if [ -f "$CERT_PATH" ]; then
    sudo docker run --rm -v "$OVPN_DATA_DIR":/etc/openvpn -e EASYRSA_BATCH=1 "$OVPN_IMAGE" easyrsa revoke $ARG_USER
    # Si la révocation réussit, on génère une nouvelle CRL.
    echo "Révocation réussie. Génération de la CRL..."
    sudo docker run --rm -v $OVPN_DATA_DIR:/etc/openvpn $OVPN_IMAGE easyrsa gen-crl
else
    echo "Certificat $ARG_USER.crt non trouvé. Poursuite de la création."
fi

# 2. Génération de la CRL (Certificate Revocation List)
echo "Génération de la CRL..."
sudo docker run --rm -v $OVPN_DATA_DIR:/etc/openvpn $OVPN_IMAGE easyrsa gen-crl

# 3. Suppression des fichiers client pour éviter les conflits
echo "Nettoyage des anciens fichiers..."
sudo rm -f $OVPN_DATA_DIR/pki/issued/$ARG_USER.crt
sudo rm -f $OVPN_DATA_DIR/pki/private/$ARG_USER.key
sudo rm -f $OVPN_DATA_DIR/pki/reqs/$ARG_USER.req

# 4. Construction du nouveau client (sans mot de passe)
echo "Création du nouveau certificat client..."
sudo docker run --rm -e EASYRSA_PASSIN=pass:$EASYRSA_PASSIN -e EASYRSA_BATCH=1 -v $OVPN_DATA_DIR:/etc/openvpn $OVPN_IMAGE easyrsa build-client-full $ARG_USER nopass

# 5. Extraction du fichier .ovpn
echo "Extraction du fichier .ovpn..."
# Le fichier final sera écrit dans le dossier userProfiles du File Share monté
sudo docker run --rm -v "$OVPN_DATA_DIR":/etc/openvpn $OVPN_IMAGE ovpn_getclient $ARG_USER > $MOUNT_POINT/userProfiles/$ARG_USER.ovpn

if [ -f "$MOUNT_POINT/userProfiles/$ARG_USER.ovpn" ]; then
  echo "$MOUNT_POINT/userProfiles/$ARG_USER.ovpn"
  exit 0
else
  echo "Erreur: le fichier .ovpn n'a pas été créé" >&2
  exit 2
fi
# Le script affiche le chemin final pour que le site web sache où lire le fichier.
VM_RENEW

chmod 750 /home/vpnadmin/vm_renew_certificate.sh
chown vpnadmin:vpnadmin /home/vpnadmin/vm_renew_certificate.sh || true

# install-vpn.sh

# ... (Après le déploiement de vm_renew_certificate.sh, avant l'étape 4)

# 3.b) Deploy Docker Compose file
cat > /home/vpnadmin/docker-compose.yml <<'EODC'
version: '3.8'
services:
  vpn-api:
    image: python:3.11-slim
    container_name: vpn-api-server
    restart: always
    # 🛑 NOUVEAU : On donne les super-pouvoirs pour accéder à l'hôte
    privileged: true
    pid: host
    
    environment:
      VPN_API_SECRET: "${vpn_api_secret}"
      SCRIPT_PATH: /home/vpnadmin/vm_renew_certificate.sh
      FLASK_APP: vpn_api.py
      VPN_PRIVATE_IP: "${vpn_private_ip}"
    volumes:
      - ./vpn_api.py:/vpn_api.py:ro
      - /home/vpnadmin/vm_renew_certificate.sh:/home/vpnadmin/vm_renew_certificate.sh:ro
      # 🛑 ON RETIRE LE MONTAGE DE SUDO ICI (supprime la ligne - /usr/bin/sudo...)
    ports:
      - "80:80"
    # On installe util-linux pour avoir la commande 'nsenter'
    command: sh -c "apt-get update && apt-get install -y util-linux && pip install flask && python /vpn_api.py"
EODC

# 3.c) Deploy Python API script
cat > /home/vpnadmin/vpn_api.py <<'EOPY'
import subprocess
import os
from flask import Flask, request, jsonify

app = Flask(__name__)

API_SECRET = os.environ.get('VPN_API_SECRET')
SCRIPT_PATH = os.environ.get('SCRIPT_PATH')

@app.route('/renew/<username>', methods=['POST'])
def renew_client(username):
    if request.headers.get('X-API-Key') != API_SECRET:
        return jsonify({"success": False, "message": "Unauthorized"}), 401
    
    if not SCRIPT_PATH:
         return jsonify({"success": False, "message": "API config error: Script path missing"}), 500

    try:
        command = [
            'nsenter', '-t', '1', '-m', '-u', '-n', '-i', 
            'sh', '-c', 
            f'sudo {SCRIPT_PATH} {username}' # On peut utiliser sudo ici car on est sur l'hôte !
        ]
        
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        
        file_path = result.stdout.strip().split('\n')[-1]

        if "Erreur" in file_path:
             raise Exception(file_path)

        return jsonify({"success": True, "path": file_path}), 200
    
    except subprocess.CalledProcessError as e:
        return jsonify({"success": False, "message": f"Script execution failed: {e.stderr}"}), 500
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
EOPY

# Mettre le propriétaire et les droits sur les nouveaux fichiers
chown vpnadmin:vpnadmin /home/vpnadmin/docker-compose.yml /home/vpnadmin/vpn_api.py || true
chmod 644 /home/vpnadmin/docker-compose.yml /home/vpnadmin/vpn_api.py || true

# 4) Generate config & PKI using kylemanna/openvpn, mounting the file share as /etc/openvpn
OVPN_DATA_DIR="$MOUNT_POINT/openvpn-data"
OVPN_IMAGE="kylemanna/openvpn"

# Generate server config (routed) - push route to Azure VNet (example 10.0.0.0/16)
# Use the VNet prefix you want clients to access (replace 10.0.0.0/16 if different)
docker run --rm -v "$OVPN_DATA_DIR":/etc/openvpn "$OVPN_IMAGE" ovpn_genconfig -u udp://$VPN_IP:$OPENVPN_PORT -r 10.0.0.0/16 -t

# Initialize PKI (non-interactive)
export EASYRSA_PASSIN="pass:$EASYRSA_PASSIN"
export EASYRSA_BATCH=1
docker run --rm -v "$OVPN_DATA_DIR":/etc/openvpn -e EASYRSA_PASSIN="$EASYRSA_PASSIN" -e EASYRSA_BATCH="$EASYRSA_BATCH" "$OVPN_IMAGE" ovpn_initpki nopass

# 5) Start OpenVPN server container
docker run -d --name openvpn-server --cap-add=NET_ADMIN -p 1194:1194/udp -v "$OVPN_DATA_DIR":/etc/openvpn "$OVPN_IMAGE"

# 6) Enable IP forwarding & NAT so VPN clients can reach Azure resources (masquerade VPN subnet)
sysctl -w net.ipv4.ip_forward=1
# Use the client subnet that image will hand out (kylemanna defaults to 10.8.0.0/24; if you configured 172.20.0.0/16 use that)
# Here we assume server pushes 172.20.0.0/16 (adjust if different)
VPN_CLIENT_SUBNET="10.0.1.0/24"
iptables -t nat -C POSTROUTING -s "$VPN_CLIENT_SUBNET" -o eth0 -j MASQUERADE 2>/dev/null || \
  iptables -t nat -A POSTROUTING -s "$VPN_CLIENT_SUBNET" -o eth0 -j MASQUERADE

# Persist iptables (requires iptables-persistent installed)
netfilter-persistent save || true

# 7) Ensure the userProfiles dir exists for storing client configs
mkdir -p "$MOUNT_POINT/userProfiles"
chmod 0777 "$MOUNT_POINT/userProfiles"

# install-vpn.sh

# ... (Après netfilter-persistent save || true)

# 8) Lancer l'API Web VPN via Docker Compose
cd /home/vpnadmin
docker compose -f docker-compose.yml up -d
cd - > /dev/null

# 9) Done
echo "OpenVPN and Web API install complete."
