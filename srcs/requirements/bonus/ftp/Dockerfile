FROM debian:bookworm

RUN apt update -y
RUN apt upgrade -y

RUN apt-get install vsftpd -y
RUN mkdir -p /var/run/vsftpd/empty

COPY tools/vsftpd.conf /etc
COPY tools/script.sh /usr/local/bin
RUN chmod +x /usr/local/bin/script.sh

ENTRYPOINT [ "/usr/local/bin/script.sh" ]