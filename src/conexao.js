const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD
    }
})

module.exports = knex