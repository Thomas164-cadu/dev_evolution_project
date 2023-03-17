const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/setup/db');
const routes = require('./src/routes/routes');

db.connect();

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

app.listen(3000, () => {
   console.log("Servidor rodando!");
});