PROJECT		= inception
DOCKER_FILE	?= ./srcs/docker-compose.yml
HOSTSFILE	?= /etc/hosts
ENVFILE		?= ./.env
DATA		?= ./data
TARGET		?=

DOCKER_COMPOSE	= export DATA=$$(cd $(DATA) 2> /dev/null && pwd); \
					docker compose --env-file $(ENVFILE) -p $(PROJECT) -f $(DOCKER_FILE)

up: $(DATA)
	@$(DOCKER_COMPOSE) up -d $(TARGET)

$(DATA): 
	@mkdir -p $(DATA)/web $(DATA)/database $(DATA)/kuma
	@chmod -R 777 $(DATA)

down:
	@if [ -z "$(TARGET)" ]; then \
		$(DOCKER_COMPOSE) down --rmi all --volumes --remove-orphans; \
	else \
		$(DOCKER_COMPOSE) stop $(TARGET); \
		$(DOCKER_COMPOSE) rm -f $(TARGET); \
		docker rmi $(PROJECT)_$(TARGET) || true; \
	fi

list:
	@$(DOCKER_COMPOSE) ps

re: down up

reall: TARGET=
reall: fclean up

rebuild:
	@$(DOCKER_COMPOSE) build --no-cache $(TARGET);
	@$(DOCKER_COMPOSE) up -d --force-recreate $(TARGET)

fclean:
	@rm -rf $(DATA)
	@$(DOCKER_COMPOSE) down --rmi all --volumes --remove-orphans

hosts:
	@. $(ENVFILE) && \
		grep -qF -- "$$URL" "$(HOSTSFILE)" || echo "127.0.0.1	$$URL" >> "$(HOSTSFILE)" && \
		grep -qF -- "$$BONUS_URL" "$(HOSTSFILE)" || echo "127.0.0.1	$$BONUS_URL" >> "$(HOSTSFILE)"

logs:
	$(DOCKER_COMPOSE) logs $(TARGET)

.PHONY: up down list re reall fclean hosts