FROM php:8.2-fpm

RUN apt-get update && apt-get install -y nginx

WORKDIR /var/www/html
COPY . /var/www/html/

COPY nginx.conf /etc/nginx/sites-available/default

RUN chmod -R 777 /var/www/html

EXPOSE 80

CMD service nginx start && php-fpm