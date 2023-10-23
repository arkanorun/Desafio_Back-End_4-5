const { Router } = require('express')
const { cadastrarUsuario, perfilUsuario, editarUsuario } = require('./src/controladores/usuarios')
const rotas = Router()
const validarCorpo = require('./src/intermediarios/validarCorpoRequisicao.js')
const usuarioSchema = require('./src/validacoes/usuario')
const { listarCategorias } = require('./src/controladores/categorias')
const login = require('./src/controladores/autenticacao')
const loginSchema = require('./src/validacoes/login')
const filtroLogin = require('./src/intermediarios/filtrarLogin')



rotas.post('/usuario', validarCorpo(usuarioSchema), cadastrarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.post('/login', validarCorpo(loginSchema), login)

rotas.use(filtroLogin)

rotas.get('/usuario', perfilUsuario)

rotas.put('/usuario', validarCorpo(usuarioSchema), editarUsuario)


module.exports = rotas
