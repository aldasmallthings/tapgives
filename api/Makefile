verbosity=15
language='en-gb'
compose:=docker-compose

help:
	@echo "Usage:"
	@echo " make help			-- display this help"
	@echo " make stack			-- installs and sets up development application"
	@echo " make tearstack			-- destroys development setup, together with development volumes"

env:
	cp .env.example .env

buildstack:
	$(compose) build 

downstack:
	$(compose) down

propagatestack:
	$(compose) up 

stack: env
stack: buildstack
stack: downstack
stack: propagatestack

tearstack:
	$(compose) down -v --rmi local --remove-orphans
