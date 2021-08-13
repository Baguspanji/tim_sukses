const router = require('express').Router()
const controller = require('../controllers')

const auth = require('../helpers/auth.session').auth

module.exports = (app) => {

    // Dashboard
    router.get('/', controller.admin.index)

    // Barang
    router.get('/user', controller.user.findAll)
    router.get('/user/add', controller.user.formAdd)
    router.post('/user', controller.user.create)
    router.get('/user/edit/:id', controller.user.formEdit)
    router.get('/user/status/:id', controller.user.status)
    router.post('/user/:id', controller.user.update)
    router.get('/user/delete/:id', controller.user.destroy)

    router.get('/get_user', controller.user.getUser)

    // Login
    router.get('/login', controller.user.home)
    router.post('/login', controller.user.login)
    router.get('/logout', controller.user.logout)

    app.use('/', router)
}