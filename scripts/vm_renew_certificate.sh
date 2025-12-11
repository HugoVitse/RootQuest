#!/bin/bash
# vm_renew_certificate.sh
# Ce script est exécuté sur la VM VPN par l'App Service

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <username>"
    exit 1
fi

ARG_USER=$1
set -euo pipefail

# Host-side directory where we store OpenVPN data (mounted from Azure File Share)
# This must match the mount point created by the install script / cloud-init
OVPN_DATA_DIR=/mnt/openvpn-share/openvpn-data
OVPN_IMAGE="kylemanna/openvpn"
EASYRSA_PASSIN="hugo"

# ensure mount points exist
mkdir -p /mnt/openvpn-share/userProfiles
mkdir -p "$OVPN_DATA_DIR"
chown root:root /mnt/openvpn-share || true

# 1. Révocation de l'ancien certificat
echo "Révocation de ${ARG_USER}..."
echo "$EASYRSA_PASSIN" | sudo docker run --rm -v "$OVPN_DATA_DIR":/etc/openvpn $OVPN_IMAGE easyrsa revoke $ARG_USER

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
sudo docker run --rm -e EASYRSA_PASSIN=pass:$EASYRSA_PASSIN -v $OVPN_DATA_DIR:/etc/openvpn $OVPN_IMAGE easyrsa build-client-full $ARG_USER nopass

# 5. Extraction du fichier .ovpn
echo "Extraction du fichier .ovpn..."
# Le fichier final sera écrit dans le dossier userProfiles du File Share monté
sudo docker run --rm -v "$OVPN_DATA_DIR":/etc/openvpn $OVPN_IMAGE ovpn_getclient $ARG_USER > /mnt/openvpn-share/userProfiles/${ARG_USER}.ovpn

if [ -f "/mnt/openvpn-share/userProfiles/${ARG_USER}.ovpn" ]; then
    echo "/mnt/openvpn-share/userProfiles/${ARG_USER}.ovpn"
    exit 0
else
    echo "Erreur: le fichier .ovpn n'a pas été créé" >&2
    exit 2
fi
# Le script affiche le chemin final pour que le site web sache où lire le fichier.