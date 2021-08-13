const Anggota = require('../models').anggota
const User = require('../models').user
const Province = require('../models').province
const Regency = require('../models').regency
const District = require('../models').district

const auth = require('../helpers/auth.session').auth

exports.findAll = (req, res) => {
    // auth(req, res)

    res.locals = {
        notifikasi: req.flash('notifikasi')[0],
        user: req.session.username,
        title: 'List Anggota',
        tabel_list: '/get_anggota'
    };

    res.render('anggota');
}

exports.getAnggota = (req, res) => {
    auth(req, res)

    Anggota
        .findAll({
            include: [User, Province, Regency, District]
        })
        .then((anggota) => {

            var list = [];
            let i = 0;

            anggota.forEach(user => {
                i++

                var edit = '<a href="/anggota/edit/' + user.id_anggota + '" class="btn btn-warning"><i class="fa fa-pen"></i></a>'
                var hapus = '<a href="/anggota/delete/' + user.id_anggota + '" class="btn btn-danger"><i class="fa fa-trash"></i></a>'

                var status = '<a href="/anggota/status/' + user.id_anggota + '" class="btn btn-danger"><i class="fa fa-times"></i></a>'
                if (user.status === 1) status = '<a href="/anggota/status/' + user.id_anggota + '" class="btn btn-success"><i class="fa fa-check"></i></a>'

                var row = [
                    i,
                    user.user.nama,
                    user.nik,
                    user.nama_anggota,
                    user.province.name,
                    user.regency.name,
                    user.district.name,
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

    Anggota
        .findOne({
            where: {
                id_anggota: req.params.id
            },
            attributes: ['id_anggota', 'status']
        })
        .then((user) => {

            var status = 0
            if (user.status == 0) {
                status = 1
            }

            Anggota
                .update({
                    status: status,
                }, {
                    where: {
                        id_anggota: req.params.id
                    }
                })
                .then((user) => {
                    req.flash('notifikasi', '<script>notifikasi("Data berhasil diubah!", "success", "fa fa-check")</script>');
                    res.redirect('/anggota');
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