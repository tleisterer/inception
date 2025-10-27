FROM debian:bookworm

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt install nginx procps -y

COPY tools/default /etc/nginx/sites-available

CMD ["nginx", "-g", "daemon off;"]