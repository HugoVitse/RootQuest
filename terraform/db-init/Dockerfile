# db-init/Dockerfile
# Utiliser une image de base légère
FROM debian:bookworm-slim

# Installer le client MariaDB
RUN apt-get update && \
    apt-get install -y mariadb-client && \
    rm -rf /var/lib/apt/lists/*

# Copier le script SQL
COPY init-db.sql /init-db.sql
#tg
# Le point d'entrée n'est pas nécessaire, car nous allons passer la commande via ACI