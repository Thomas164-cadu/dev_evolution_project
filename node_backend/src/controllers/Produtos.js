const ProdutoService = new (require('../services/Produto'));

module.exports = class Produtos {

    async create(req, res) {
        try {
            const produto = await ProdutoService.create(req.body);
            return res.status(200).json(produto);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async listByCategoria(req, res) {
        try {
            const produtos = await ProdutoService.listByCategoria(req.params.categoria);
            return res.status(200).json(produtos);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async list(req, res) {
        try {
            const produtos = await ProdutoService.list();
            return res.status(200).json(produtos);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async update(req, res) {
        try {
            const produto = await ProdutoService.update(req.params.id, req.body);
            return res.status(200).json(produto);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async delete(req, res) {
        try {
            const produto = await ProdutoService.delete(req.params.id);
            return res.status(200).json(produto);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async generate(req, res) {
        try {
            const produtos = await ProdutoService.generate();
            return res.status(200).json(produtos);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};