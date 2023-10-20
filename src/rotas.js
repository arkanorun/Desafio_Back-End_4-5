const { Router } = require('express')
const { cadastrarUsuario, perfilUsuario, editarUsuario } = require('./controladores/usuarios')
const rotas = Router()
const validarCorpo = require('./intermediarios/validarCorpoRequisicao.js')
const { loginSchema, usuarioSchema, clienteSchema } = require('./validacoes/schema')
const { listarCategorias } = require('./controladores/categorias')
const login = require('./controladores/autenticacao')

const filtroLogin = require('./intermediarios/filtrarLogin')
const { cadastrarCliente } = require('./controladores/clientes')



rotas.post('/usuario', validarCorpo(usuarioSchema), cadastrarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.post('/login', validarCorpo(loginSchema), login)

rotas.post('/cliente', validarCorpo(clienteSchema), cadastrarCliente)

rotas.use(filtroLogin)

rotas.get('/usuario', perfilUsuario)

rotas.put('/usuario', validarCorpo(usuarioSchema), editarUsuario)


module.exports = rotas
