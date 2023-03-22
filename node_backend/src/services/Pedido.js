const modelPedidos = require('../models/pedido');
const modelProduto = require('../models/produto');
const modelCategoria = require('../models/categoria');

module.exports = class Pedido {

    async create(pedido) {
        try {
            let valorTotal = 0;
            let precos = [];
            let categoria = '';

            await Promise.all(pedido.produtos.map(async (idProduto) => {
                const produtoEncontrado = await modelProduto.findById(idProduto);
                precos.push(produtoEncontrado.preco);

                const categoriaPedido = await modelCategoria.findById(pedido.categoria);
                categoria = categoriaPedido.nome;
            }));

            precos.forEach((preco) => {
                valorTotal += preco;
            });

            pedido.valor = valorTotal;
            pedido.categoria = categoria;

            const pedidos = await modelPedidos.create(pedido);

            return pedidos;
        } catch (err) {
            return err;
        }
    }

    async list(params) {
        try {
            const pedidos = await modelPedidos.find({ usuario: params });
            return pedidos
        } catch (err) {
            return err;
        }
    }

    async delete(params) {
        try {
            const pedidos = await modelPedidos.deleteOne({ _id: params });
            return pedidos
        } catch (err) {
            return err;
        }
    }

    async update(params, body) {
        console.log(params, body);
        try {
            let valorTotal = 0;
            let precos = [];

            await Promise.all(body.produtos.map(async (idProduto) => {
                const produtoEncontrado = await modelProduto.findById(idProduto);
                precos.push(produtoEncontrado.preco);
            }));

            precos.forEach((preco) => {
                valorTotal += preco;
            });

            body.valor = valorTotal;

            const pedidos = await modelPedidos.updateOne({ _id: params }, { $set: body });

            return pedidos;

        } catch (err) {
            return err;
        }
    }
}