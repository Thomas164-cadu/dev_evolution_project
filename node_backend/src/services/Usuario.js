const modelUsuario = require('../models/usuario');

const jwt = require('jsonwebtoken');

module.exports = class Usuario{

    async create(body){
        try {
            const usuario = await modelUsuario.create(body);
            return usuario
        } catch (err) {
            return err;
        }
    }

    async login(body) {
        const email = body.email;
        const senha = body.senha;

        if(!email || !senha) {
            return {status: 400, message: "Email e senha são obrigatórios"};
        }

        const usuario = await modelUsuario.findOne({email: email, senha: senha});

        if(!usuario) {
            return {status: 400, message: "Email ou senha inválidos"};
        }

        return jwt.sign({
            _id: usuario._id
        }, 'secret')
    }

}