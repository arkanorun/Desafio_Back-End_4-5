const knex = require('../conexao')


const listarCategorias = async (req, res) => {

    try {
        const categoriasLista = await knex('categorias').orderBy('id')

        return res.json(categoriasLista)

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }

}

module.exports = { listarCategorias }