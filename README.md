# Conversor de Moedas (API)

Este projeto é uma api RESTFULL simples 

# Requistos
 - É necessário ter o docker compose e o npm instalado 

# Instalação
 Primeiramente é necessário instalar os pacotes que iremos utilizar:
 
``` 
   $ npm install
```

Depois é necessário configurar as variáveis de ambiente no arquivo .env como no arquivo .env.example, existem duas variaveis de ambiente que é a porta e o uri do banco.

Finalmente exacutar o comando: 

```
   $ docker-compose up
```
 
 Por fim pode consumir a api por default em http://localhost:3000.
 
# Endpoints
 Existem 3 endpoints que poderão ser consumidos:
  - GET /veiculos - busca todos os veiculos
  - GET /veiculos/find - busca veiculos de acordo com a query
  - GET /veiculos:id - busca um veiculos especifico 
  - POST /veiculos - cadastra  um veiculo
  - PUT /veiculos/:id - atualiza um veiculo
  - PATCH /veiculos/:id - atualiza parcialmente um veiculo
  - DELETE /veiculos/:id - deleta de um veiculo