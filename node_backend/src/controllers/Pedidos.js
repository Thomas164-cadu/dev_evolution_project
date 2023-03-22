const PedidoService = new (require('../services/Pedido'));

module.exports = class Pedidos {
    async create(req, res) {
        try {
            const pedido = await PedidoService.create(req.body);
            return res.status(200).json(pedido);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async update(req, res) {
        console.log(req.body);
        try {
            const pedido = await PedidoService.update(req.params.id, req.body);
            return res.status(200).json(pedido);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async delete(req, res) {
        try {
            const pedido = await PedidoService.delete(req.params.id);
            return res.status(200).json(pedido);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async list(req, res) {
        try {
            const pedidos = await PedidoService.list(req.params.usuario);
            return res.status(200).json(pedidos);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

}