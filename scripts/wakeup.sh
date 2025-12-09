#!/bin/bash
# wake-up.sh

echo "☕ Réveil de la base de données..."
az mysql flexible-server start \
  --resource-group rootquest-dev-rg \
  --name rootquest-dev-mysql

echo "🚀 Démarrage de l'app..."
az webapp start \
  --resource-group rootquest-dev-rg \
  --name rootquest-dev-app