#!/bin/zsh
# sleep.sh

echo "💤 Mise en veille de la base de données..."
# Cela arrête le compteur €€€ pour le CPU/RAM de la DB
az mysql flexible-server stop \
  --resource-group rootquest-dev-rg \
  --name rootquest-dev-mysql

echo "⏸️  Arrêt de l'application (Optionnel, ne change pas le prix du plan B1)"
az webapp stop \
  --resource-group rootquest-dev-rg \
  --name rootquest-dev-app