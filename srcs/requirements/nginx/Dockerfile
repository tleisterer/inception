FROM debian:bookworm

RUN apt update -y
RUN apt upgrade -y

RUN apt install nginx procps -y

COPY tools/default /etc/nginx/sites-available
RUN mkdir -p /etc/nginx/ssl
COPY tools/cert.pem /etc/nginx/ssl/cert.pem
COPY tools/key.pem /etc/nginx/ssl/key.pem

CMD ["nginx", "-g", "daemon off;"]