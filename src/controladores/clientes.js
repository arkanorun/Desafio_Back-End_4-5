const knex = require('../conexao')

const editarCliente = async (req, res) => {
    const { id } = req.params;

    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {

        const idCorrespondente = await knex('clientes').where({ id }).first()

        if (!idCorrespondente) {
            return res.status(404).json({ mensagem: "O ID informado não foi encontrado em nenhum registro" })
        }

        const emailCadastrado = await knex('clientes').where({ email }).where('id', '!=', id).first()

        if (emailCadastrado) {
            return res.status(400).json({ mensagem: 'O email informado já está cadastrado' })
        }

        const cpfCadastrado = await knex('clientes').where({ cpf }).where('id', '!=', id).first()

        if (cpfCadastrado) {
            return res.status(400).json({ mensagem: 'O CPF informado já está cadastrado' })
        }


        const clienteAtualizado = await knex('clientes').where({ id }).update({
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

        return res.status(200).json(clienteAtualizado[0])

    } catch (error) {

        return res.status(500).json({ mensagem: error.message })

    }
}

const detalharCliente = async (req, res) => {
    const { id } = req.params;

    try {

        const idCorrespondente = await knex('clientes').where({ id }).first()

        if (!idCorrespondente) {
            return res.status(404).json({ mensagem: "O ID informado não foi encontrado em nenhum registro" })
        }

        return res.status(200).json(idCorrespondente)

    } catch (error) {

        return res.status(500).json({ mensagem: error.message })

    }
}

module.exports = {
    editarCliente,
    detalharCliente
}

