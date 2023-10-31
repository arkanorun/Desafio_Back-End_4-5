const fs = require('fs/promises')
const handlebars = require('handlebars')

const compiladorHtml = async (caminhoDoArquivo, contexto) => {
    const arquivo = await fs.readFile(caminhoDoArquivo)
    const compilador = handlebars.compile(arquivo.toString())
    const htmlString = compilador(contexto)

    return htmlString
}



module.exports = { compiladorHtml } 