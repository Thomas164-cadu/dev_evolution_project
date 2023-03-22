const modelUsuario = require('../models/usuario');

const jwt = require('jsonwebtoken');

module.exports = class Usuario {

    async create(body) {
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

        if (!email || !senha) {
            return { status: 400, message: "Email e senha são obrigatórios" };
        }

        const usuario = await modelUsuario.findOne({ email: email, senha: senha });

        if (!usuario) {
            return { status: 400, message: "Email ou senha inválidos" };
        }

        return jwt.sign({
            _id: usuario._id
        }, 'secret')
    }

    async findUserByToken(authorization) {
        try {
            const token = authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, 'secret');
            const userId = decodedToken._id;
            const user = await modelUsuario.findById(userId);

            if (!user) {
                throw new Error('Usuário não encontrado.');
            }

            return user;
        } catch (error) {
            return error;
        }
    }


}