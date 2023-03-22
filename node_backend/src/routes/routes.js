const express = require('express');
const router = express.Router();
const usuarioController = new (require('../controllers/Usuarios'));
const produtoController = new (require('../controllers/Produtos'));
const categoriaController = new (require('../controllers/Categorias'));
const pedidoController = new (require('../controllers/Pedidos'));

const validate = require('./auth/validate');

/*Rotas de Usuários*/
router.post('/cadastro', (req, res) => {
    usuarioController.create(req, res);
});

router.post('/login', (req, res) => {
    usuarioController.login(req, res);
});

router.get('/usuario', validate(), (req, res) => {
    usuarioController.findUserByToken(req, res);
});

/*Rotas de Produtos*/
router.get('/generate', validate(), (req, res) => {
    produtoController.generate(req, res);
});

router.get('/produtos', validate(), (req, res) => {
    produtoController.list(req, res);
});

router.get('/produtos/:categoria', validate(), (req, res) => {
    produtoController.listByCategoria(req, res);
});

router.post('/produtos', validate(), (req, res) => {
    produtoController.create(req, res);
});

router.put('/produtos/:id', validate(), (req, res) => {
    produtoController.update(req, res);
});

router.delete('/produtos/:id', validate(), (req, res) => {
    produtoController.delete(req, res);
});

/*Rotas de Categorias*/
router.get('/categorias', validate(), (req, res) => {
    categoriaController.list(req, res);
});

router.post('/categorias', validate(), (req, res) => {
    categoriaController.create(req, res);
});

router.put('/categorias/:id', validate(), (req, res) => {
    categoriaController.update(req, res);
});

router.delete('/categorias/:id', validate(), (req, res) => {
    categoriaController.delete(req, res);
});

/*Rotas de Pedidos*/
router.get('/pedidos/:usuario', validate(), (req, res) => {
    pedidoController.list(req, res);
});

router.post('/pedidos', validate(), (req, res) => {
    pedidoController.create(req, res);
});

router.put('/pedidos/:id', validate(), (req, res) => {
    pedidoController.update(req, res);
});

router.delete('/pedidos/:id', validate(), (req, res) => {
    pedidoController.delete(req, res);
});

module.exports = router;