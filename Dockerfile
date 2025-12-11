# Étape 1: Construire l'application
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances du répertoire rootquest
COPY rootquest/package*.json ./
#COPY .env.docker ./rootquest/.env

# Installer les dépendances
RUN npm install

# Copier le reste du code de l'application
COPY rootquest/ ./

# Construire l'application
RUN npm run build

# Étape 2: Image de production
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/server.ts ./

# Copier le fichier d'environnement (si nécessaire pour le démarrage)
COPY .env.docker ./.env

# Exposer le port 3000
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
