PROJECT = inception
DOCKER_FILE=./srcs/docker-compose.yml

up:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) up -d $(TARGET)

down:
	@if [ -z "$(TARGET)" ]; then \
		docker compose -p $(PROJECT) -f $(DOCKER_FILE) down --rmi all --volumes --remove-orphans; \
	else \
		docker compose -p $(PROJECT) -f $(DOCKER_FILE) stop $(TARGET); \
		docker compose -p $(PROJECT) -f $(DOCKER_FILE) rm -f $(TARGET); \
		docker rmi $(PROJECT)_$(TARGET); \
	fi

list:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) ps

re: down up

reall: fclean
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) up -d

rebuild:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) build --no-cache $(TARGET)
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) up -d --force-recreate $(TARGET)

fclean:
	@docker compose -p $(PROJECT) -f $(DOCKER_FILE) down --rmi all --volumes --remove-orphans
	@rm -rf ./srcs/data