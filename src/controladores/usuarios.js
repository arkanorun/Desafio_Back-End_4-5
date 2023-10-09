const knex = require('../conexao')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {

        const UsuarioBusca = await knex('usuarios').where({ email }).first()

        if (UsuarioBusca) {
            return res.status(400).json({ mensagem: 'o email informado já existe' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuarioCadastrado = await knex('usuarios').insert({
            nome,
            email,
            senha: senhaCriptografada
        }).returning('*')

        const { senha: _, ...novoUsuario } = usuarioCadastrado[0]

        return res.status(201).json(novoUsuario)



    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

const perfilUsuario = (req, res) => {
    return res.json(req.usuario)
}

module.exports = { cadastrarUsuario, perfilUsuario }