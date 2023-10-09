const joi = require('joi')

const loginSchema = joi.object({
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

module.exports = loginSchema