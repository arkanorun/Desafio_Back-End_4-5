const validarCorpo = schema => async (req, res, next) => {

    try {

        const payload = await schema.validateAsync(req.body)
        req.body = payload

        next()

    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = validarCorpo