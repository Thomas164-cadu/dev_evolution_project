# dev_evolution_project
Projeto destinado ao DevEvolution de acordo com pré-requisitos estabelecidos pela IXC

Para o seguinte o projeto foi solicitada a criação de uma API Node com recursos básicos de Criação, Edição, Listagem e Exclusão de pedidos

Contudo, para melhor aproveitar a API, foi criado um sistema completo com duas frentes:

FrontEnd : ReactJS
BackEnd : NodeJS

Para rodar o projeto, garanta que a porta 3000 de sua máquina local esteja livre para rodar o projeto backend
pois as rotas da interface estão fixas para: localhost:3000

Também garanta que sua máquina tenha o MongoDB instalado assim como o pacote pm2

Navegue até a pasta node_backend para acessar o back do projeto
Ao acessar a pasta execute os seguintes comandos:

$ npm install
$ pm2 start

Desta forma o backend do projeto já irá estar rodando

Navegue até a pasta react_frontend para acessar o front do projeto
Ao acessar a pasta execute os seguintes comandos:

$ npm install
$ npm start

Desta forma o frontend do projeto irá ser executado e abrirá uma janela em seu navegador padrão para acessar o sistema

A documentação completa com cada rota pode ser encontrada na raiz do projeto em um arquivo JSON para ser importado em alguma ferramenta como Insomnia ou Postman
