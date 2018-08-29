.PHONY: install-node
node:
	@apt-get install nodejs

.PHONY: install-angular-cli
cli:
	@npm install -g @angular/cli

.PHONY: install-npm
npm:
	@npm install

.PHONY: build
build:
	@ng build

.PHONY: image
image:
	@docker image build -t frontend-teste .

.PHONY: subir-service container
up:
	@docker container run -d -p 8080:80  --name frontend-teste frontend-teste
