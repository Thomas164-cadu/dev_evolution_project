# Projeto DevEvolution - API Node para Pedidos

Este projeto foi desenvolvido para o DevEvolution, seguindo os pré-requisitos estabelecidos pela IXC. O objetivo era criar uma API Node com recursos básicos de Criação, Edição, Listagem e Exclusão de pedidos.

Além disso, foi criado um sistema completo com duas frentes: 

* FrontEnd: ReactJS 
* BackEnd: NodeJS 

## Como rodar o projeto

Para rodar o projeto, verifique se a porta 3000 de sua máquina local está livre para executar o projeto backend, já que as rotas da interface estão fixas para: `localhost:3000`.

Também é importante garantir que a sua máquina tenha o MongoDB instalado, assim como o pacote `pm2`.

### Backend

Navegue até a pasta `node_backend` para acessar o back do projeto. Ao acessar a pasta, execute os seguintes comandos:

$ npm install
$ pm2 start

Desta forma, o backend do projeto já estará rodando.

### Frontend

Navegue até a pasta `react_frontend` para acessar o front do projeto. Ao acessar a pasta, execute os seguintes comandos:

$ npm install
$ npm start

Desta forma, o frontend do projeto será executado e abrirá uma janela em seu navegador padrão para acessar o sistema.

## Documentação

A documentação completa com cada rota pode ser encontrada na raiz do projeto em um arquivo JSON para ser importado em alguma ferramenta como Insomnia ou Postman.
