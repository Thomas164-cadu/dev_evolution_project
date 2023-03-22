const mongoose = require('mongoose');

const produtoSchema = mongoose.Schema({
    nome: String,
    preco: Number,
    categoria: {type: mongoose.Schema.Types.ObjectId, ref: 'categoria'}
});

module.exports = mongoose.model('produto', produtoSchema, 'produtos');