FROM debian:bookworm

RUN apt update -y
RUN apt upgrade -y

RUN apt-get install php-fpm php-mysqli php-mbstring php-gd php-curl php-json php-xml php-zip php-exif php-redis curl -y
RUN mkdir -p /run/php

COPY tools/www.conf /etc/php/8.2/fpm/pool.d
COPY tools/script.sh /usr/local/bin
RUN chmod +x /usr/local/bin/script.sh

ENTRYPOINT [ "/usr/local/bin/script.sh" ]