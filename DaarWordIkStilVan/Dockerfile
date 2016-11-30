
FROM php:apache
ADD ./.docker/php.ini /usr/local/etc/php/
ADD ./.docker/certs/localhost.crt /etc/ssl/certs/localhost.crt
ADD ./.docker/certs/localhost.key /etc/ssl/private/localhost.key
RUN a2enmod ssl; \
    sed -i -e 's/ssl-cert-snakeoil.pem/localhost.crt/g' -e 's/ssl-cert-snakeoil.key/localhost.key/g' /etc/apache2/sites-available/default-ssl.conf; \
    a2ensite default-ssl;
VOLUME /var/www/html/
EXPOSE 80 443
