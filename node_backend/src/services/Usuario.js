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

}