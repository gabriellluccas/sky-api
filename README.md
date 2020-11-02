# Api de autenticação

Este projeto é uma api de autenticação simples 

# Requistos
 - É necessário ter o docker compose e o npm instalado 

# Instalação
 Primeiramente é necessário instalar os pacotes que iremos utilizar:
 
``` 
   $ npm install
```

Depois é necessário configurar as variáveis de ambiente no arquivo .env como no arquivo .env.example.

Finalmente exacutar o comando: 

```
   $ docker-compose up
```
 
 Por fim poderá consumir a api por padrão em http://localhost:3000.
 
# Endpoints
 Existem 3 endpoints que poderão ser consumidos:
  - POST /sign-up - Cadastra o usuário
  - POST /sign-in - Login do usuário 
  - GET /users/:id - Busca o usuário de acordo com o id passado
  
# Testes
 Para rodar os testes é necessário criar o arquivo .env.test com o NODE_ENV=test além das outras variáveis como o arquivo .env.example
 Deverá executar os testes dentro do container se o DB_LINK_NAME for diferente de 0.0.0.0
 Foram feitos 3 testes de integração no endpoint POST /sign-up
```
   $ npm run test
```
 