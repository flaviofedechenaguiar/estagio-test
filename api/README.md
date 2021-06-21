# API de gestão de Cliente e Admin
## Para executar o projeto
### 1 - Vá ao diretorio raiz do projeto e execute 

``` pc@pc:~/Desktop/PorjetoECODE$ npm install ```
### 2 - Logo após execute 

```flavio@flavio:~/Desktop/PorjetoECODE$ docker-compose up```

- Talvez pode apresentar um erro, caso aconteça execute o passo 2 novamente
 
- Espere o carregamento de todas a imagens e apresentar a respectiva menssagem: 

```mysql-container | 2021-05-03T16:19:40.900512Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.24'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.```

### 3 - No projeto estou utilizando o POSTMAN para efetuar as requisições
- Caso fizermos uma requisição em uma rota de login, ira ser retornado um token, para que possamos utilizarmos, devemos ir em 
- 1 - Botão Authorization
- 2 - No Select 'Type' selecionar a opção Bearer Token
- 3 - Inserir o Token retornado ao efetuar o login para proceguir com os testes


## Rotas
### [GET] localhost:3030/clients
Será retornado os dados de todos os clientes presentes no sistema:
```
{
    "clients": [
        {
            "id": 10,
            "name": "flavio",
            "cpf": "83149425379",
            "rg": "41243.432.423",
            "birth": "2021-06-13T00:00:00.000Z",
            "sex": 1,
            "zipCode": "987234",
            "address": "ruas das olivas",
            "number": "342",
            "district": "jardim bonitu",
            "complement": "house",
            "state": "PR",
            "city": "Umuarama",
            "email": "teste@teste.com",
            "password": "$2b$10$m7uEVItP5/BCjkeZdwBkk..YQzF96Q6jUTeO.O07P9qJVyeHxbSo.",
            "status": true,
            "createdAt": "2021-06-14T21:48:53.000Z",
            "updatedAt": "2021-06-14T21:48:53.000Z"
        }
    ],
    ...
}
```
### [POST] localhost:3030/clients
Será reponsavel pela criação de um novo cliente
#### Body params
```
{
    "name": "flavio",
    "cpf": "83149425379",
    "rg": "41243.432.423",
    "birth": "2021-06-13T00:00:00.000Z",
    "sex": 1,
    "zipCode": "987234",
    "address": "ruas das olivas",
    "number": "342",
    "district": "jardim bonitu",
    "complement": "house",
    "state": "PR",
    "city": "Umuarama",
    "email": "teste@teste.com",
    "password": "123456",
    "status": true,
    "ddCellPhone":"44",
    "numberCellPhone":"30303030"

}
```

### [PUT] localhost:3030/clients/{id}
Será responsável pela deleção de um cliente


### [POST] localhost:3030/clients/login
Será responsável pelo login do cliente, com o retorno de um token de autorização
```
{
    "message": "Cliente logado com sucesso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiY2xpZW50IiwiaWQiOjEwLCJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsImlhdCI6MTYyMzcwNzYwOCwiZXhwIjoxNjIzNzExMjA4fQ.pl4jbUK2bAIJk-qs9RUPcgGVe9oF_eBkh1ZzGCuzUyg"
}
```

### [POST] localhost:3030/admins
Será responsável pela criação de um novo Administrador
#### Body params
```
{
   "email":"emaildoadmin@email.com",
   "password":"passworddoadmin"
}
```
