const knex = require('../conexao')



const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const categoriaBusca = await knex('categorias').where('id', '=', categoria_id).first();

        if (!categoriaBusca) {
            return res.status(404).json({ mensagem: 'A categoria de produto informada não foi encontrada.' });
        }

        const produtoCriado = await knex('produtos').insert({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        }).returning('*');

        return res.status(200).json({ mensagem: 'Produto criado com sucesso.', produto: produtoCriado[0] });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};

const detalharProdutoId = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoBusca = await knex('produtos').where({ id }).first();

        if (!produtoBusca) {
            return res.status(404).json({ mensagem: 'ID de produto inexistente.' });
        }

        return res.status(200).json(produtoBusca);
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};


const listarProduto = async (req, res) => {

    const { categoria_id } = req.query;

    try {
        if (Number(categoria_id)) {
            const categoria = await knex('categorias').where('id', categoria_id).first();

            if (categoria) {
                const produtos = await knex('produtos').where('categoria_id', categoria_id).orderBy('id');
                if (produtos == 0) {
                    return res.status(404).json({ mensagem: 'Nenhum produto foi cadastrado nessa categoria.' });
                }
                return res.status(200).json(produtos);
            } else {
                return res.status(404).json({ mensagem: 'Categoria não cadastrada.' });
            }
        } else if (categoria_id && !Number(categoria_id)) {
            return res.status(400).json({ mensagem: 'categoria com formato inváido' })
        } else {
            const produtos = await knex('produtos').orderBy('id');
            return res.status(200).json(produtos);
        }
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}


const editarProduto = async (req, res) => {

    const { id } = req.params;
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

    try {
        const produtoBusca = await knex('produtos').where({ id }).first()

        if (!produtoBusca) {

            return res.status(404).json({ mensagem: 'ID de produto inexistente.' })
        }

        const categoriaBusca = await knex('categorias').where('id', '=', categoria_id).first()
        if (!categoriaBusca) {

            return res.status(404).json({ mensagem: 'A categoria de produto informada não foi encontrada.' })

        }

        const produtoEditado = await knex('produtos').where({ id }).update({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id
        });

        return res.status(200).json({ mensagem: 'Produto atualizado com sucesso.' });

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

const excluirProdutoPorId = async (req, res) => {

    const { id } = req.params;

    try {
        const produtoBusca = await knex('produtos').where({ id }).first()

        if (!produtoBusca) {

            return res.status(404).json({ mensagem: 'ID de produto inexistente.' })
        }

        await knex('produtos').where({ id }).del();

        return res.status(200).json({ mensagem: 'Produto excluído com sucesso.' })

    } catch (error) {

        return res.status(500).json({ mensagem: error.message })
    }

}



module.exports = {
    cadastrarProduto,
    detalharProdutoId,
    listarProduto,
    editarProduto,
    excluirProdutoPorId
}
