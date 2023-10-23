const knex = require('../conexao')

const listarProduto = async (req, res) => {
    const { categoria_id } = req.query;

    try {
        if (categoria_id) {
            const categoria = await knex('categorias').where('id', categoria_id).first();

            if (categoria) {
                const produtos = await knex('produtos').where('categoria_id', categoria_id);
                if (produtos == 0) {
                    return res.status(200).json({ mensagem: 'Nenhum produto foi cadastrado nessa categoria.' });
                }
                return res.status(200).json(produtos);
            } else {
                return res.status(404).json({ mensagem: 'Categoria não cadastrada.' });
            }
        } else {
            const produtos = await knex('produtos').select('*');
            return res.status(200).json(produtos);
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}


module.exports = { listarProduto }