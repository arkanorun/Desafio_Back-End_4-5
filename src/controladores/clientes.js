const knex = require('../conexao')

const cadastrarCliente = async (req, res) => {

    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {

        const emailCadastrado = await knex('clientes').where({ email }).first()

        if (emailCadastrado) {
            return res.status(400).json({ mensagem: 'o email informado já existe' })
        }

        const cpfCadastrado = await knex('clientes').where({ cpf }).first()

        if (cpfCadastrado) {
            return res.status(400).json({ mensagem: 'o cpf informado já existe' })
        }

        const novoCliente = await knex('clientes').insert({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }).returning('*')

        return res.status(201).json(novoCliente[0])

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

}

module.exports = {
    cadastrarCliente
}

