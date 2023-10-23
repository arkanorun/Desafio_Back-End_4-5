const { Router } = require('express')
const { cadastrarUsuario, perfilUsuario, editarUsuario } = require('./controladores/usuarios')
const rotas = Router()
const validarCorpo = require('./intermediarios/validarCorpoRequisicao.js')
const { loginSchema, usuarioSchema, produtoSchema, clienteSchema } = require('./validacoes/schema')
const { listarCategorias } = require('./controladores/categorias')
const { cadastrarCliente, editarCliente, detalharCliente } = require('./controladores/clientes')
const login = require('./controladores/autenticacao')
const filtroLogin = require('./intermediarios/filtrarLogin')
const { cadastrarProduto, detalharProdutoId, editarProduto, excluirProdutoPorId } = require('./controladores/produtos')



rotas.post('/usuario', validarCorpo(usuarioSchema), cadastrarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.post('/login', validarCorpo(loginSchema), login)

rotas.use(filtroLogin)

rotas.get('/usuario', perfilUsuario)

rotas.put('/usuario', validarCorpo(usuarioSchema), editarUsuario)

rotas.put('/produto/:id', validarCorpo(produtoSchema), editarProduto)

rotas.delete('/produto/:id', excluirProdutoPorId)

rotas.post('/cliente', validarCorpo(clienteSchema), cadastrarCliente)

rotas.put('/cliente/:id', validarCorpo(clienteSchema), editarCliente)

rotas.get('/cliente/:id', detalharCliente)

rotas.post('/produto', validarCorpo(produtoSchema), cadastrarProduto)

rotas.get('/produtos/:id', detalharProdutoId)



module.exports = rotas