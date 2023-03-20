const express = require('express');
const router = express.Router();
const usuarioController = new (require('../controllers/Usuarios'));

router.get('/', (req, res) => {
    res.send("OK");
});

router.post('/cadastro', (req, res) => {
    usuarioController.create(req, res);
});

router.post('/login', (req, res) => {
    usuarioController.login(req, res);
});

module.exports = router;