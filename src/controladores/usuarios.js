const knex = require('../conexao')
const bcrypt = require('bcrypt')


const cadastrarUsuario = async (req, res) => {

    const { nome, email, senha } = req.body

    try {

        const usuarioBusca = await knex('usuarios').where({ email }).first()

        if (usuarioBusca) {
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
        return res.status(500).json({ mensagem: error.message })
    }
}

const perfilUsuario = (req, res) => {

    return res.json(req.usuario)
}

const editarUsuario = async (req, res) => {

    const { nome, email, senha } = req.body;

    const { id } = req.usuario;

    try {
        const usuarioBusca = await knex('usuarios').where({ id }).first()
        if (usuarioBusca.email != email) {

            const usuarioBuscaPorEmail = await knex('usuarios').where({ email }).first()
            if (usuarioBuscaPorEmail) {
                return res.status(400).json({ mensagem: 'o email informado já está cadastrado.' })
            }
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuarioEditado = await knex('usuarios').update({
            nome,
            email,
            senha: senhaCriptografada
        }).where({ id });

        return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.' });



    } catch (error) {

        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { cadastrarUsuario, perfilUsuario, editarUsuario }