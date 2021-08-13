const User = require('../models').user
const bcrypt = require('bcryptjs')

exports.home = (req, res) => {
    res.locals = {
        title: 'Login Admin',
        notifikasi: req.flash('notifikasi')[0]
    };

    res.render('auth/login');
}

exports.login = (req, res) => {
    User
        .findOne({
            where: {
                username: req.body.username,
            },
        }).then(user => {

            if (!user) {
                req.flash('notifikasi', '<script>notifikasi("Login Gagal, Username tidak ditemukan", "danger", "fa fa-exclamation-triangle")</script>');
                res.redirect('/')
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                req.flash('notifikasi', '<script>notifikasi("Login Gagal, Password Salah", "danger", "fa fa-exclamation-triangle")</script>');
                res.redirect('/')
            }

            if (user.role != 'isAdmin') {
                req.flash('notifikasi', '<script>notifikasi("Login Gagal, Anda bukan admin", "danger", "fa fa-exclamation-triangle")</script>');
                res.redirect('/')
            }

            sess = req.session;
            sess.username = user.username;
            sess.id_user = user.id_user;

            res.redirect('/')

        }).catch(err => {

            req.flash('notifikasi', '<script>notifikasi("Login Gagal, Username atau Password Salah", "danger", "fa fa-exclamation-triangle")</script>');
            res.redirect('/')
        })
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
}

exports.findAll = (req, res) => {
    res.locals = {
        notifikasi: req.flash('notifikasi')[0],
        user: req.session.username,
        title: 'List User',
        tabel_list: '/get_user'
    };

    res.render('user');
}

exports.getUser = (req, res) => {
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
    res.locals = {
        notifikasi: req.flash('notifikasi')[0],
        user: req.session.username,
        title: 'Tambah user',
    };

    res.render('user/form');
}

exports.create = (req, res) => {
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

exports.findOne = (req, res) => {
    Barang
        .findOne({
            where: {
                id_barang: req.params.id
            },
            attributes: ['id_user', 'nama', 'username', 'email']
        })
        .then((barang) => {
            res.status(200).send({
                status: true,
                message: 'item succesfully',
                data: barang
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.formEdit = (req, res) => {
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