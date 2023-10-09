const joi = require('joi')

const usuarioSchema = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'o campo nome é obrigatório',
        'string.empty': 'o campo nome não pode estar vazio',
        'string.base': 'o campo nome precisa ser do tipo string'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'o campo email é obrigatório',
        'string.email': 'o campo email deve ser um email com formato válido',
        'string.empty': 'o campo email não pode estar vazio',
    }),
    senha: joi.string().required().messages({
        'any.required': 'o campo senha é obrigatório',
        'string.empty': 'o campo senha não pode estar vazio',
        'string.base': 'o campo senha precisa ser do tipo string'
    })
})

module.exports = usuarioSchema