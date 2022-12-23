restart: down build
up: 
	sudo docker-compose up 
down: 
	sudo docker-compose down --remove-orphans
build: 
	sudo docker-compose up --build
