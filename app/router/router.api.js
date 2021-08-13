const router = require('express').Router()
const api = require('../api')
const jwt = require('../helpers/config_jwt')

module.exports = (app) => {

    // User
    router.post('/signup', api.user.signUp)
    router.post('/signin', api.user.signIn)
    router.get('/user', jwt.authenticateToken, api.user.findOne)

    app.use('/api', router)
}