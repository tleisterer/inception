PROJECT = inception
DOCKER_FILE=./srcs/docker-compose.yml

up:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) up -d

down:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) down

stop:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) stop

start:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) start

list:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) ps

rm:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) rm -s -f

new:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) build --no-cache
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) up -d --force-recreate

re: fclean up

fclean:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) down --rmi all --volumes --remove-orphans
	@rm -rf srcs/data