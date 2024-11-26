# Executables (local)
DOCKER = docker-compose -f ./docker-compose.yml --env-file ./.env.local
EXEC = $(DOCKER) exec react-app

## —— Docker 🐳 ————————————————————————————————————————————————————————————————

build: ## Builds the Docker images
	@$(DOCKER) build --no-cache

up: ## Start the docker containers in detached mode (no logs)
	@$(DOCKER) up -d

down: ## Stop the docker containers
	@$(DOCKER) down

cli: ## Access the React container
	@$(EXEC) bash

logs: ## Show logs from the container
	@$(DOCKER) logs -f react-app

install: ## Install dependencies inside the container
	@$(EXEC) npm install

start: ## Start the React app in development mode
	@$(EXEC) npm start

build-app: ## Build the React app for production
	@$(EXEC) npm run build

setup: ## Setup the project: Install dependencies, build the app, and start the container
	@$(DOCKER) up -d
	@$(EXEC) npm install
	npm install
	@$(EXEC) npm run build
	@$(EXEC) npm start
