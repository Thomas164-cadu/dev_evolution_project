const modelCategoria = require('../models/categoria');

module.exports = class Categoria {
    async create(body) {
        try {
            const categoria = await modelCategoria.create(body);
            return categoria
        } catch (err) {
            return err;
        }
    }

    async list() {
        try {
            const categorias = await modelCategoria.find();
            return categorias
        } catch (err) {
            return err;
        }
    }

    async update(params, body) {
        try {
            const categorias = await modelCategoria.updateOne({_id: params},{$set: body});
            return categorias
        } catch (err) {
            return err;
        }

    }

    async delete(params) {

        try {
            const categorias = await modelCategoria.deleteOne({_id: params});
            return categorias
        } catch (err) {
            return err;
        }
    }
};