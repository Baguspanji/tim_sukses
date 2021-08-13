const Note = require('../models').note
const User = require('../models').user

const auth = require('../helpers/auth.session').auth

exports.findAll = (req, res) => {
    // auth(req, res)

    res.locals = {
        notifikasi: req.flash('notifikasi')[0],
        user: req.session.username,
        title: 'List Anggota',
        tabel_list: '/get_note'
    };

    res.render('note');
}

exports.getNote = (req, res) => {
    auth(req, res)

    Note
        .findAll({
            include: [User]
        })
        .then((note) => {

            var list = [];
            let i = 0;

            note.forEach(user => {
                i++

                var edit = '<a href="/note/edit/' + user.id_catatan + '" class="btn btn-warning"><i class="fa fa-pen"></i></a>'
                var hapus = '<a href="/note/delete/' + user.id_catatan + '" class="btn btn-danger"><i class="fa fa-trash"></i></a>'

                var status = '<a href="/note/status/' + user.id_catatan + '" class="btn btn-danger"><i class="fa fa-times"></i></a>'
                if (user.status === 1) status = '<a href="/note/status/' + user.id_catatan + '" class="btn btn-success"><i class="fa fa-check"></i></a>'

                var row = [
                    i,
                    user.user.nama,
                    user.topik,
                    user.isi,
                    status,
                    // edit + ' ' + hapus
                ]
                list.push(row)
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

exports.status = (req, res) => {
    auth(req, res)

    Note
        .findOne({
            where: {
                id_catatan: req.params.id
            },
            attributes: ['id_catatan', 'status']
        })
        .then((user) => {

            var status = 0
            if (user.status == 0) {
                status = 1
            }

            Note
                .update({
                    status: status,
                }, {
                    where: {
                        id_catatan: req.params.id
                    }
                })
                .then((user) => {
                    req.flash('notifikasi', '<script>notifikasi("Data berhasil diubah!", "success", "fa fa-check")</script>');
                    res.redirect('/note');
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