PROJECT = inception
DOCKER_FILE=./srcs/docker-compose.yml

up:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) up -d $(TARGET)

down:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) down $(TARGET)

stop:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) stop $(TARGET)

start:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) start $(TARGET)

list:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) ps

rm:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) rm -s -f $(TARGET)

re: clean up

reall: fclean
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) up -d

rebuild:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) build --no-cache $(TARGET)
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) up -d --force-recreate $(TARGET)

clean:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) down --rmi all --volumes --remove-orphans $(TARGET)

fclean:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) down --rmi all --volumes --remove-orphans
	@rm -rf ./srcs/data