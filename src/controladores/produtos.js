const knex = require('../conexao')

const listarProduto = async (req, res) => {

    const { categoria_id } = req.query;

    let produtos;

    try {
        if (categoria_id) {
            produtos = await knex('produtos').where('categoria_id', categoria_id);
        } else {
            produtos = await knex('produtos').select('*');
        }

        return res.status(200).json(produtos);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

}

module.exports = { listarProduto }