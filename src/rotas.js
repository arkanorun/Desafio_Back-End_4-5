const { Router } = require('express')
const { cadastrarUsuario, perfilUsuario, editarUsuario } = require('./controladores/usuarios')
const rotas = Router()
const validarCorpo = require('./intermediarios/validarCorpoRequisicao.js')
const { loginSchema, usuarioSchema, produtoSchema, clienteSchema, pedidoSchema } = require('./validacoes/schema')
const { listarCategorias } = require('./controladores/categorias')
const { cadastrarCliente, listarCliente, editarCliente, detalharCliente } = require('./controladores/clientes')
const login = require('./controladores/autenticacao')
const filtroLogin = require('./intermediarios/filtrarLogin')
const { cadastrarProduto, detalharProdutoId, listarProduto, editarProduto, excluirProdutoPorId } = require('./controladores/produtos')
const { cadastrarPedidos } = require('./controladores/pedidos')


rotas.post('/usuario', validarCorpo(usuarioSchema), cadastrarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.post('/login', validarCorpo(loginSchema), login)

rotas.use(filtroLogin)

rotas.get('/usuario', perfilUsuario)

rotas.put('/usuario', validarCorpo(usuarioSchema), editarUsuario)

rotas.post('/cliente', validarCorpo(clienteSchema), cadastrarCliente)

rotas.put('/cliente/:id', validarCorpo(clienteSchema), editarCliente)

rotas.get('/cliente', listarCliente)

rotas.get('/cliente/:id', detalharCliente)

rotas.post('/produto', validarCorpo(produtoSchema), cadastrarProduto)

rotas.put('/produto/:id', validarCorpo(produtoSchema), editarProduto)

rotas.get('/produto', listarProduto);

rotas.get('/produto/:id', detalharProdutoId)

rotas.delete('/produto/:id', excluirProdutoPorId)

rotas.post('/pedido', validarCorpo(pedidoSchema), cadastrarPedidos)

module.exports = rotas