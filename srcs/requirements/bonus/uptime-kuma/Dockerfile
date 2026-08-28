FROM debian:bookworm

RUN apt update -y
RUN apt upgrade -y

RUN apt install git npm nodejs sqlite3 curl -y
RUN git clone https://github.com/louislam/uptime-kuma.git
WORKDIR /uptime-kuma
RUN git checkout 2.0.0
COPY ./tools/script.sh /usr/local/bin
RUN chmod +x /usr/local/bin/script.sh

ENTRYPOINT [ "/usr/local/bin/script.sh" ]