const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const knex = require('../conexao')

const hash = process.env.JWT_HASH


const login = async (req, res) => {
    const { email, senha } = req.body

    try {

        const usuarioBusca = await knex('usuarios').where({ email }).first()

        if (!usuarioBusca) {
            return res.status(404).json({ mensagem: 'não foi possível localizar o usuario' })
        }

        const senhaCerta = await bcrypt.compare(senha, usuarioBusca.senha)

        if (!senhaCerta) {
            return res.status(400).json({ mensagem: 'email e senha inválidos' })
        }

        const token = jwt.sign({ id: usuarioBusca.id }, hash, { expiresIn: '24h' })

        const { senha: _, ...dadosUsuario } = usuarioBusca

        return res.status(201).json({
            usuario: dadosUsuario,
            token
        })
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }

}

module.exports = login