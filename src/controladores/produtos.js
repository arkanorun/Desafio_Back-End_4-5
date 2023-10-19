const knex = require('../conexao')


const editarProduto = async (req,res) => {

        
	const {id} = req.params;
	const {descricao, quantidade_estoque, valor, categoria_id} = req.body;



        

        try {
            const produtoBusca = await knex('produtos').where({ id }).first()
            if (!produtoBusca){

                
                    return res.status(400).json({ mensagem: 'ID de produto inexistente.'})
                }
            
	    
                


            const categoriaBusca = await knex('categorias').where('id','=', categoria_id).first()
	    if(!categoriaBusca){
	    
		return res.status(400).json({mensagem: 'A categoria de produto informada não foi encontrada.'})
	
	    }		
	

            const usuarioEditado = await knex('produtos').where({id}).update({
                descricao,
                quantidade_estoque,
                valor,
	        categoria_id
            });

            return res.status(200).json({mensagem: 'Produto atualizado com sucesso.'});
                 
            

        } catch (error) {    
            return res.status(500).json({ mensagem: error.message})
        }
}

const excluirProdutoPorId = async (req,res) => {

	const {id} = req.params;

	try {
         const produtoBusca = await knex('produtos').where({ id }).first()
            if (!produtoBusca){

                
                    return res.status(400).json({ mensagem: 'ID de produto inexistente.'})
                }

	await knex('produtos').where({id}).del();
	
	return res.status(200).json({ mensagem: 'Produto excluído com sucesso.'})  


        } catch (error) {    
            
            return res.status(500).json({ mensagem: error.message})
        }
		



}

module.exports = {
    editarProduto,
    excluirProdutoPorId
}