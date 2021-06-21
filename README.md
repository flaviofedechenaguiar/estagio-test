# Projeto para Avaliação

#### O projeto esta organizado em duas pastas, uma contém o back-end(api) e outra possui o fron-end(front-end).

## BACKEND
### As técnologias utilizadas são:
- Express
- JWT
- Sequelize ORM
- Docker e Docker-compose
- MVC
- Repository Pattern

### Executando o Projeto

Para executar o projeto 

- Vá ao diretório raiz da Api.
```
user@user:~/Desktop/projectfolder$ ls
api  front-end  README.md
user@user:~/Desktop/projectfolder$ cd api
```
- Execute o comando `npm install`
 ```
 user@user:~/Desktop/projectfolder/api$ ls
controllers  docker-compose.yml  index.js     models        package.json       README.md     routers
database     Dockerfile          middlewares  node_modules  package-lock.json  repositories
user@user:~/Desktop/projectfolder/api$ npm install
 ```
 - Execute o comando `docker-compose up`
 ```
  user@user:~/Desktop/projectfolder/api$ ls
controllers  docker-compose.yml  index.js     models        package.json       README.md     routers
database     Dockerfile          middlewares  node_modules  package-lock.json  repositories
user@user:~/Desktop/projectfolder/api$ docker-compose up
 ```
 Obs: Pode ser gerador um erro ao executar pela primeira vez. Caso ocorra execute o comando novamente.
 
 - Aguarde a resposta do respectivo comando:
 ```
 mysql-container | 2021-06-21T00:59:16.270917Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.25'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
 ```
 
 
