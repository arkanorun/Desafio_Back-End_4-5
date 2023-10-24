const joi = require('joi')

const usuarioSchema = joi.object({
    nome: joi.string().required().trim().messages({
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
    email: joi.string().email().trim().required().messages({
        'any.required': 'o campo email é obrigatório',
        'string.email': 'o campo email deve ser um email com formato válido',
        'string.empty': 'o campo email não pode estar vazio',
        'string.base': 'o campo email precisa ser do tipo string'
    }),
    senha: joi.string().trim().required().messages({
        'any.required': 'o campo senha é obrigatório',
        'string.empty': 'o campo senha não pode estar vazio',
        'string.base': 'o campo senha precisa ser do tipo string'
    })
})

const produtoSchema = joi.object({
    descricao: joi.string().required().trim().messages({
        'any.required': 'o campo descricao é obrigatório',
        'string.empty': 'o campo descricao não pode estar vazio',
        'string.base': 'o campo descricao precisa ser do tipo string'
    }),
    quantidade_estoque: joi.number().positive().integer().required().messages({
        'any.required': 'o campo quantidade_estoque é obrigatório',
        'number.base': 'o campo quantidade_estoque precisa ser formado apenas por numeros',
        'number.integer': 'o campo quantidade_estoque precisa ser um número inteiro',
        'number.positive': 'o campo quantidade_estoque precisa ser um número positivo'
    }),
    valor: joi.number().positive().integer().required().messages({
        'any.required': 'o campo valor é obrigatório',
        'number.base': 'o campo valor precisa ser formado apenas por numeros',
        'number.positive': 'o campo valor precisa ser um número positivo',
        'number.integer': 'o campo categoria_id precisa ser um número inteiro'
    }),
    categoria_id: joi.number().integer().required().messages({
        'any.required': 'o campo categoria_id é obrigatório',
        'number.base': 'o campo categoria_id precisa ser formado apenas por numeros',
        'number.integer': 'o campo categoria_id precisa ser um número inteiro'
    })
})

const clienteSchema = joi.object({
    nome: joi.string().required().trim().messages({
        'any.required': 'o campo nome é obrigatório',
        'string.empty': 'o campo nome não pode estar vazio',
        'string.base': 'o campo nome precisa ser do tipo string',
    }),
    email: joi.string().email().trim().required().messages({
        'any.required': 'o campo email é obrigatório',
        'string.email': 'o campo email deve ser um email com formato válido',
        'string.empty': 'o campo email não pode estar vazio'
    }),
    cpf: joi.string().required().length(11).pattern(/^[0-9]+$/, 'numbers').messages({
        'any.required': 'o campo cpf é obrigatório',
        'string.base': 'o campo cpf precisa ser do tipo string',
        'string.length': 'o campo cpf deve possuir 11 números',
        'string.pattern.name': 'o campo cpf deve ser uma string de valores numéricos'
    }),
    cep: joi.string().min(8).max(11).trim().messages({
        'string.empty': 'o campo cep não pode estar vazio',
        'string.base': 'o campo cep precisa ser do tipo string',
        'string.max': 'o campo cep deve não pode conter menos que 8 ou mais que 11 valores',
        'string.min': 'o campo cep não pode conter menos que 8 ou mais que 11 valores'
    }),
    rua: joi.string().trim().messages({
        'string.empty': 'o campo rua não pode estar vazio',
        'string.base': 'o campo rua precisa ser do tipo string'
    }),
    numero: joi.string().trim().messages({
        'string.empty': 'o campo numero não pode estar vazio',
        'string.base': 'o campo numero precisa ser do tipo string'
    }),
    bairro: joi.string().trim().messages({
        'string.empty': 'o campo bairro não pode estar vazio',
        'string.base': 'o campo bairro precisa ser do tipo string'
    }),
    cidade: joi.string().trim().messages({
        'string.empty': 'o campo cidade não pode estar vazio',
        'string.base': 'o campo cidade precisa ser do tipo string'
    }),
    estado: joi.string().trim().messages({
        'string.empty': 'o campo estado não pode estar vazio',
        'string.base': 'o campo estado precisa ser do tipo string'
    })
})

module.exports = { usuarioSchema, loginSchema, produtoSchema, clienteSchema }