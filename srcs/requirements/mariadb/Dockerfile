FROM debian:bookworm

RUN apt update -y
RUN apt upgrade -y

RUN apt-get install mariadb-server -y
RUN mkdir -p /run/mysqld

COPY tools/50-server.cnf /etc/mysql/mariadb.conf.d
COPY tools/script.sh /usr/local/bin
RUN chmod +x /usr/local/bin/script.sh

ENTRYPOINT [ "/usr/local/bin/script.sh" ]