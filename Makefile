
DOCKER_FILE=./srcs/docker-compose.yml

up:
	@docker compose -f $(DOCKER_FILE) up -d

re:
	@docker compose -f $(DOCKER_FILE) up --build --remove-orphans --force-recreate -d

down:
	@docker compose -f $(DOCKER_FILE) down

stop:
	@docker compose -f $(DOCKER_FILE) stop

start:
	@docker compose -f $(DOCKER_FILE) start

list:
	@docker compose -f $(DOCKER_FILE) ps

rm:
	@docker compose -f $(DOCKER_FILE) rm