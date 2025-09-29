FROM debian:bullseye

RUN apt-get update -y
RUN apt-get upgrade -y

RUN apt-get install redis-server -y

COPY tools/redis.conf /etc/redis

CMD [ "redis-server", "--protected-mode", "no" ]