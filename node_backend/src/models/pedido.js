const mongoose = require('mongoose');

const pedidoSchema = mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario' },
    produtos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto'
    }],
    valor: Number,
    categoria: String,
    idCategoria: { type: mongoose.Schema.Types.ObjectId, ref: 'categoria' },
});

module.exports = mongoose.model('pedido', pedidoSchema, 'pedidos');