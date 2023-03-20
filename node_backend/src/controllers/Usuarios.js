const UsuarioService =  new (require('../services/Usuario'));

module.exports = class Usuarios {

    async create(req, res) {
        try {
            const usuario = await UsuarioService.create(req.body);
            return res.status(200).json(usuario);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async login(req, res) {
        try {
            const usuario = await UsuarioService.login(req.body);
            return res.status(200).json(usuario);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

}