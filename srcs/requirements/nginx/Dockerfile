FROM debian:bookworm

RUN apt update -y
RUN apt upgrade -y

RUN apt install nginx curl gettext-base -y

COPY tools/default /etc/nginx/sites-available
RUN mkdir -p /etc/nginx/ssl
COPY tools/cert.pem /etc/nginx/ssl/cert.pem
COPY tools/key.pem /etc/nginx/ssl/key.pem

COPY tools/script.sh /usr/local/bin
RUN chmod +x /usr/local/bin/script.sh

CMD ["/usr/local/bin/script.sh"]