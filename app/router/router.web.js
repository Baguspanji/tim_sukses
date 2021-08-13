const router = require('express').Router()
const controller = require('../controllers')

module.exports = (app) => {

    // Dashboard
    router.get('/', controller.admin.index)

    // Login
    router.get('/login', controller.user.home)
    router.post('/login', controller.user.login)
    router.get('/logout', controller.user.logout)

    // User
    router.get('/user', controller.admin.findAll)
    router.get('/user/add', controller.admin.formAdd)
    router.post('/user', controller.admin.create)
    router.get('/user/edit/:id', controller.admin.formEdit)
    router.get('/user/status/:id', controller.admin.status)
    router.post('/user/:id', controller.admin.update)
    router.get('/user/delete/:id', controller.admin.destroy)

    router.get('/get_user', controller.admin.getUser)

    // Area
    router.get('/province', controller.area.getProvince)
    router.post('/regency', controller.area.getRegency)
    router.post('/district', controller.area.getDistrict)

    // Anggota
    router.get('/anggota', controller.anggota.findAll)
    router.get('/anggota/status/:id', controller.anggota.status)

    router.get('/get_anggota', controller.anggota.getAnggota)

    // Catatan
    router.get('/note', controller.note.findAll)
    router.get('/note/status/:id', controller.note.status)

    router.get('/get_note', controller.note.getNote)

    app.use('/', router)
}