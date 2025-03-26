# Utiliser une image PHP avec FPM et Nginx
FROM php:8.2-fpm

# Installer Nginx
RUN apt-get update && apt-get install -y nginx

# Copier les fichiers du CTF
WORKDIR /var/www/html
COPY index.php .
COPY database.db .
COPY flag.txt .

# Configurer Nginx
COPY nginx.conf /etc/nginx/sites-available/default

# Donner les bons droits
RUN chmod 777 database.db flag.txt

# Exposer le port 80
EXPOSE 80

# Lancer Nginx et PHP-FPM
CMD service nginx start && php-fpm
