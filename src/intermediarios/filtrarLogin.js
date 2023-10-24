const jwt = require('jsonwebtoken')
const knex = require('../conexao')

const hash = process.env.JWT_HASH

const filtroLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, hash);

        const UsuarioBusca = await knex('usuarios').where({ id }).first();

        if (!UsuarioBusca) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' });
        }

        const { senha, ...usuario } = UsuarioBusca;

        req.usuario = usuario;

        next()

    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }

};

module.exports = filtroLogin