const CategoriaService = new (require('../services/Categoria'));

module.exports = class Categorias {

    async create(req, res){
        try {
            const categoria = await CategoriaService.create(req.body);
            return res.status(200).json(categoria);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async list(req, res){
        try {
            const categorias = await CategoriaService.list();
            return res.status(200).json(categorias);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async update(req, res){
        try {
            const categoria = await CategoriaService.update(req.params.id, req.body);
            return res.status(200).json(categoria);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async delete(req, res){
        try {
            const categoria = await CategoriaService.delete(req.params.id);
            return res.status(200).json(categoria);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

};