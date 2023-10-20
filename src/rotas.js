const { Router } = require('express')
const { cadastrarUsuario, perfilUsuario, editarUsuario } = require('./controladores/usuarios')
const rotas = Router()
const validarCorpo = require('./intermediarios/validarCorpoRequisicao.js')
const { loginSchema, usuarioSchema, produtoSchema } = require('./validacoes/schema')
const { listarCategorias } = require('./controladores/categorias')
const login = require('./controladores/autenticacao')

const filtroLogin = require('./intermediarios/filtrarLogin')
const { editarProduto, excluirProdutoPorId } = require('./controladores/produtos')



rotas.post('/usuario', validarCorpo(usuarioSchema), cadastrarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.post('/login', validarCorpo(loginSchema), login)

rotas.use(filtroLogin)

rotas.get('/usuario', perfilUsuario)

rotas.put('/usuario', validarCorpo(usuarioSchema), editarUsuario)

rotas.put('/produto/:id', validarCorpo(produtoSchema), editarProduto)
rotas.delete('/produto/:id', excluirProdutoPorId)

module.exports = rotas
