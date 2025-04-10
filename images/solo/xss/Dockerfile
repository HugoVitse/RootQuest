# Utiliser l'image PHP 8.2 avec FPM
FROM php:8.2-fpm

# Installer Nginx
RUN apt-get update && apt-get install -y nginx

# Copier les fichiers du challenge
WORKDIR /var/www/html
COPY . /var/www/html/

# Configurer Nginx
COPY nginx.conf /etc/nginx/sites-available/default

# Donner les bons droits aux fichiers importants
RUN chmod -R 777 /var/www/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx et PHP-FPM
CMD service nginx start && php-fpm
