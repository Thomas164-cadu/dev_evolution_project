const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
});

module.exports = mongoose.model('usuario', usuarioSchema, 'usuarios');