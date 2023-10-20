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
        'string.base': 'o campo email precisa ser do tipo string'
    }),
    senha: joi.string().required().messages({
        'any.required': 'o campo senha é obrigatório',
        'string.empty': 'o campo senha não pode estar vazio',
        'string.base': 'o campo senha precisa ser do tipo string'
    })
})

const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'o campo email é obrigatório',
        'string.email': 'o campo email deve ser um email com formato válido',
        'string.empty': 'o campo email não pode estar vazio',
        'string.base': 'o campo email precisa ser do tipo string'
    }),
    senha: joi.string().required().messages({
        'any.required': 'o campo senha é obrigatório',
        'string.empty': 'o campo senha não pode estar vazio',
        'string.base': 'o campo senha precisa ser do tipo string'
    })
})

const produtoSchema = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'o campo descricao é obrigatório',
        'string.empty': 'o campo descricao não pode estar vazio',
        'string.base': 'o campo descricao precisa ser do tipo string'
    }),
    quantidade_estoque: joi.number().positive().integer().required().messages({
        'any.required': 'o campo quantidade_estoque é obrigatório',
        'number.base': 'o campo quantidade_estoque precisa ser do tipo numérico',
        'number.integer': 'o campo quantidade_estoque precisa ser um número inteiro',
        'number.positive': 'o campo quantidade_estoque precisa ser um número positivo'
    }),
    valor: joi.number().positive().required().messages({
        'any.required': 'o campo valor é obrigatório',
        'number.base': 'o campo valor precisa ser do tipo numérico',
        'number.positive': 'o campo valor precisa ser um número positivo'
    }),
    categoria_id: joi.number().positive().integer().required().messages({
        'any.required': 'o campo categoria_id é obrigatório',
        'number.base': 'o campo categoria_id precisa ser do tipo numérico',
        'number.integer': 'o campo categoria_id precisa ser um número inteiro',
        'number.positive': 'o campo categoria_id precisa ser um número positivo'
    })
})

const clienteSchema = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'o campo nome é obrigatório',
        'string.empty': 'o campo nome não pode estar vazio',
        'string.base': 'o campo nome precisa ser do tipo string'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'o campo email é obrigatório',
        'string.email': 'o campo email deve ser um email com formato válido',
        'string.empty': 'o campo email não pode estar vazio'
    }),
    cpf: joi.number().precision(11).required().positive().integer().messages({
        'any.required': 'o campo cpf é obrigatório',
        'number.base': 'o campo cpf precisa ser do tipo string',
        'number.integer': 'o campo cpf precisa ser um número inteiro',
        'number.positive': 'o campo cpf precisa ser um número positivo',
        'number.precision': 'o campo cpf deve possuir 11 números'
    }),
    cep: joi.string().messages({
        'string.empty': 'o campo cep não pode estar vazio',
        'string.base': 'o campo cep precisa ser do tipo string'
    }),
    rua: joi.string().messages({
        'string.empty': 'o campo rua não pode estar vazio',
        'string.base': 'o campo rua precisa ser do tipo string'
    }),
    numero: joi.string().messages({
        'string.empty': 'o campo numero não pode estar vazio',
        'string.base': 'o campo numero precisa ser do tipo string'
    }),
    cidade: joi.string().messages({
        'string.empty': 'o campo cidade não pode estar vazio',
        'string.base': 'o campo cidade precisa ser do tipo string'
    }),
    bairro: joi.string().messages({
        'string.empty': 'o campo bairro não pode estar vazio',
        'string.base': 'o campo bairro precisa ser do tipo string'
    }),
    estado: joi.string().messages({
        'string.empty': 'o campo estado não pode estar vazio',
        'string.base': 'o campo estado precisa ser do tipo string'
    })

})

module.exports = { usuarioSchema, loginSchema, produtoSchema, clienteSchema }