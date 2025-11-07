FROM debian:bookworm

RUN apt update -y
RUN apt upgrade -y

RUN apt-get install curl php-fpm php-mysql -y
RUN mkdir -p /run/php
RUN mkdir -p /var/www/adminer
RUN curl -L "https://github.com/vrana/adminer/releases/download/v5.4.1/adminer-5.4.1.php" -o /var/www/adminer/index.php

ENTRYPOINT [ "php", "-S", "0.0.0.0:8080", "-t", "/var/www/adminer" ]