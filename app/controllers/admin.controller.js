const User = require('../models').user
const Anggota = require('../models').anggota

const bcrypt = require('bcryptjs')
const auth = require('../helpers/auth.session').auth

exports.index = (req, res) => {
    auth(req, res)

    User.count({
        where: {
            role: 'isUser',
            status: 1
        }
    }).then((users) => {
        Anggota.count({
            where: {
                status: 1
            }
        }).then((anggotas) => {
            res.locals = {
                title: 'Dashboard',
                notifikasi: req.flash('notifikasi')[0],
                user: req.session.username,
                totalUser: users,
                totalAnggota: anggotas,
            };

            res.render('index');
        })
    })

}

exports.findAll = (req, res) => {
    auth(req, res)

    res.locals = {
        notifikasi: req.flash('notifikasi')[0],
        user: req.session.username,
        title: 'List User',
        tabel_list: '/get_user'
    };

    res.render('user');
}

exports.getUser = (req, res) => {
    auth(req, res)

    User
        .findAll({
            attributes: ['id_user', 'nama', 'username', 'email', 'status', 'role']
        })
        .then((users) => {

            var list = [];
            let i = 0;

            users.forEach(user => {
                if (user.role !== 'isAdmin') {

                    i++

                    var edit = '<a href="/user/edit/' + user.id_user + '" class="btn btn-warning"><i class="fa fa-pen"></i></a>'
                    var hapus = '<a href="/user/delete/' + user.id_user + '" class="btn btn-danger"><i class="fa fa-trash"></i></a>'

                    var status = '<a href="/user/status/' + user.id_user + '" class="btn btn-danger"><i class="fa fa-times"></i></a>'
                    if (user.status === 1) status = '<a href="/user/status/' + user.id_user + '" class="btn btn-success"><i class="fa fa-check"></i></a>'

                    var row = [
                        i,
                        user.username,
                        user.nama,
                        user.email,
                        status,
                        edit + ' ' + hapus
                    ]
                    list.push(row)
                }
            });

            res.status(200).send({
                data: list
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error
            })
        })
}

exports.formAdd = (req, res) => {
    auth(req, res)

    res.locals = {
        notifikasi: req.flash('notifikasi')[0],
        user: req.session.username,
        title: 'Tambah user',
    };

    res.render('user/form');
}

exports.create = (req, res) => {
    auth(req, res)

    User
        .create({
            username: req.body.username,
            nama: req.body.nama,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.username, 8)
        })
        .then((user) => {
            req.flash('notifikasi', '<script>notifikasi("Data berhasil ditambahkan!", "success", "fa fa-check")</script>');
            res.redirect('/user');
        })
        .catch((error) => {
            var row = {}
            error.errors.forEach(ero => {
                row[ero.path] = ero.message
            })

            res.locals = {
                notifikasi: req.flash('notifikasi')[0],
                user: req.session.username,
                errors: row,
                title: 'Tambah user',
            };

            res.render('user/form');
        })
}

exports.formEdit = (req, res) => {
    auth(req, res)

    User
        .findOne({
            where: {
                id_user: req.params.id
            },
            attributes: ['id_user', 'nama', 'username', 'email']
        })
        .then((user) => {

            res.locals = {
                notifikasi: req.flash('notifikasi')[0],
                user: req.session.username,
                title: 'Edit user',
                data: user
            };

            res.render('user/form');
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.update = (req, res) => {
    auth(req, res)

    User
        .update({
            username: req.body.username,
            nama: req.body.nama,
            email: req.body.email,
        }, {
            where: {
                id_user: req.params.id
            }
        })
        .then((user) => {
            req.flash('notifikasi', '<script>notifikasi("Data berhasil diubah!", "success", "fa fa-check")</script>');
            res.redirect('/user');
        })
        .catch((error) => {
            var row = {}
            error.errors.forEach(ero => {
                row[ero.path] = ero.message
            })

            res.locals = {
                notifikasi: req.flash('notifikasi')[0],
                user: req.session.username,
                errors: row,
                title: 'Tambah user',
            };

            res.render('user/form');
        })
}

exports.destroy = (req, res) => {
    auth(req, res)

    User
        .destroy({
            where: {
                id_user: req.params.id
            }
        })
        .then((user) => {
            req.flash('notifikasi', '<script>notifikasi("Data berhasil dihapus!", "success", "fa fa-check")</script>');
            res.redirect('/user');
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.status = (req, res) => {
    auth(req, res)

    User
        .findOne({
            where: {
                id_user: req.params.id
            },
            attributes: ['id_user', 'status']
        })
        .then((user) => {

            var status = 0
            if (user.status == 0) {
                status = 1
            }

            User
                .update({
                    status: status,
                }, {
                    where: {
                        id_user: req.params.id
                    }
                })
                .then((user) => {
                    req.flash('notifikasi', '<script>notifikasi("Data berhasil diubah!", "success", "fa fa-check")</script>');
                    res.redirect('/user');
                })
                .catch((error) => {
                    res.status(401).send({
                        status_response: 'Bad Request',
                        errors: error.errors
                    })
                })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}