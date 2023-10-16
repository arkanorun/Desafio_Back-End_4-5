const { Router } = require('express')
const { cadastrarUsuario, perfilUsuario, editarUsuario } = require('./controladores/usuarios')
const rotas = Router()
const validarCorpo = require('./intermediarios/validarCorpoRequisicao.js')
const usuarioSchema = require('./validacoes/usuario')
const { listarCategorias } = require('./controladores/categorias')
const login = require('./controladores/autenticacao')
const loginSchema = require('./validacoes/login')
const filtroLogin = require('./intermediarios/filtrarLogin')



rotas.post('/usuario', validarCorpo(usuarioSchema), cadastrarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.post('/login', validarCorpo(loginSchema), login)

rotas.use(filtroLogin)

rotas.get('/usuario', perfilUsuario)

rotas.put('/usuario', validarCorpo(usuarioSchema), editarUsuario)


module.exports = rotas