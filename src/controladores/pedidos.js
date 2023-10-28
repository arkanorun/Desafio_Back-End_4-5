const knex = require('../conexao')
const conexao = require('../conexao')


const cadastrarPedidos = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos, produto_id, quantidade_produto } = req.body
    const arrayProdutos = []
    let valorCompra = 0

    try {

        const buscaCliente = await knex('clientes').where({ id: cliente_id }).first()

        if (!buscaCliente) {
            return res.status(404).json({ mensagem: "cliente com o id informado não existe" })
        }

        for (let i of pedido_produtos) {
            const buscaProduto = await knex('produtos')
                .where({ id: i.produto_id })
                .first()

            if (!buscaProduto) {
                return res.status(404).json({ mensagem: "produto com o id informado não existe" })
            }

            const quantidadeRestante = buscaProduto.quantidade_estoque - i.quantidade_produto

            valorCompra = valorCompra + (i.quantidade_produto * buscaProduto.valor)

            if (quantidadeRestante < 0) {
                return res.status(400).json({
                    mensagem: "Não temos a quantidade informada do produto disponível no estoque"
                })
            }

            arrayProdutos.push({
                produto_id: i.produto_id,
                quantidade_produto: i.quantidade_produto
            })

            const atualizarEstoqueProdutos = await knex('produtos').update({

                quantidade_estoque: quantidadeRestante
            })
                .where({ id: i.produto_id })
        }

        const pedidoCadastro = await knex('pedidos').insert({
            cliente_id,
            observacao,
            valor_total: valorCompra
        })
            .returning('*')


        for (let i of pedido_produtos) {

            const buscaProduto = await knex('produtos').where({ id: i.produto_id }).first()

            const pedidoProdutosCadastro = await knex('pedido_produtos').insert({
                pedido_id: pedidoCadastro[0].id,
                produto_id: i.produto_id,
                quantidade_produto: i.quantidade_produto,
                valor_produto: buscaProduto.valor
            })
        }

        return res.status(201).json({
            cliente_id,
            observacao,
            pedido_produtos: arrayProdutos
        })

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
}

module.exports = { cadastrarPedidos }