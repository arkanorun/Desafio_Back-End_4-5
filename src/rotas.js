const { Router } = require('express')
const { cadastrarUsuario, perfilUsuario, editarUsuario } = require('./controladores/usuarios')
const rotas = Router()
const validarCorpo = require('./intermediarios/validarCorpoRequisicao.js')
const { loginSchema, usuarioSchema, clienteSchema } = require('./validacoes/schema')
const { listarCategorias } = require('./controladores/categorias')
const { cadastrarCliente } = require('./controladores/clientes')
const login = require('./controladores/autenticacao')

const filtroLogin = require('./intermediarios/filtrarLogin')



rotas.post('/usuario', validarCorpo(usuarioSchema), cadastrarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.post('/login', validarCorpo(loginSchema), login)

rotas.use(filtroLogin)

rotas.get('/usuario', perfilUsuario)

rotas.put('/usuario', validarCorpo(usuarioSchema), editarUsuario)

rotas.post('/cliente', validarCorpo(clienteSchema), cadastrarCliente)

module.exports = rotas
