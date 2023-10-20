const knex = require('../conexao')

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        const verificaEmail = await knex('clientes').where({ email }).first();

        if (verificaEmail) {
            return res.status(400).json({ mensagem: 'O email informado já existe.' });
        }

        const verificaCpf = await knex('clientes').where({ cpf }).first();

        if (verificaCpf) {
            return res.status(400).json({ mensagem: 'O CPF informado já existe.' });
        }

        const clienteCadastrado = await knex('clientes').insert({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado
        }).returning('*');

        return res.status(201).json(clienteCadastrado[0]);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = { cadastrarCliente }