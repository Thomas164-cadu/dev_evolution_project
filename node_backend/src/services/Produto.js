const modelProduto = require('../models/produto');
const modelCategoria = require('../models/categoria');
const categorias = require('../generate/categorias.json');
const produtosGerator = require('../generate/produtos.json');

module.exports = class Produto {
    async create(body) {
        try {
            const produto = await modelProduto.create(body);
            return produto
        } catch (err) {
            return err;
        }
    }

    async update(params, body) {
        try {
            const produto = await modelProduto.updateOne({ _id: params }, { $set: body });
            return produto
        } catch (err) {
            return err;
        }
    }

    async delete(params) {
        try {
            const produto = await modelProduto.deleteOne({ _id: params });
            return produto
        } catch (err) {
            return err;
        }
    }

    async list() {
        try {
            const produtos = await modelProduto.find();
            return produtos
        } catch (err) {
            return err;
        }
    }

    async listByCategoria(params) {
        try {
            const produtos = await modelProduto.find({ categoria: params });
            return produtos
        } catch (err) {
            return err;
        }
    }

    async generate(){
        try {
            let categoriasId = [];

            await Promise.all(categorias.map(async (categoria) => {
                const categoriaModel = await modelCategoria.create(categoria);
                categoriasId.push(categoriaModel._id);
            }));
                
            await Promise.all(produtosGerator.map(async (produto) => {
                const categoria = categoriasId[Math.floor(Math.random() * categoriasId.length)];
                produto.categoria = categoria;
                const produtoModel = await modelProduto.create(produto);
            }));
            
        } catch (err) {
            return err;
        }
    }
}