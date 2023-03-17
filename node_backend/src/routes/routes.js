const express = require('express');
const router = express.Router();
const usuarioController = new (require('../controllers/Usuarios'));

router.get('/', (req, res) => {
    res.send("OK");
});

router.post('/usuarios', (req, res) => {
    usuarioController.create(req, res);
});

module.exports = router;