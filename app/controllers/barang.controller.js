const Barang = require('../models').barang;
const toRupiah = require('../helpers/toRupiah')

exports.findAll = (req, res) => {
    Barang
        .findAll({
            attributes: ['id_barang', 'nama_barang', 'harga']
        })
        .then((barang) => {
            res.locals = {
                title: 'List Barang',
                barangs: barang,
                tabel_list: '/get_barang'
            };

            res.render('barang');
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error
            })
        })
}

exports.getBarang = (req, res) => {
    Barang
        .findAll({
            attributes: ['id_barang', 'nama_barang', 'harga']
        })
        .then((barangs) => {

            var list = [];
            let i = 0;

            barangs.forEach(barang => {
                i++

                var edit = '<a href="/barang/edit/' + barang.id_barang + '" class="btn btn-warning">Edit</a>'
                var hapus = '<a href="/barang/delete/' + barang.id_barang + '" class="btn btn-danger">Hapus</a>'
                var row = [
                    i,
                    barang.nama_barang,
                    toRupiah.convertToRupiah(barang.harga),
                    edit + ' ' + hapus
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

exports.formAdd = (req, res) => {
    res.locals = {
        title: 'Tambah Barang',
    };

    res.render('barang/form');
}

exports.create = (req, res) => {
    Barang
        .create({
            nama_barang: req.body.nama_barang,
            harga: req.body.harga
        })
        .then((barang) => {
            res.redirect('/barang');
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.findOne = (req, res) => {
    Barang
        .findOne({
            where: {
                id_barang: req.params.id
            },
            attributes: ['id_barang', 'nama_barang', 'harga']
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
    Barang
        .findOne({
            where: {
                id_barang: req.params.id
            },
            attributes: ['id_barang', 'nama_barang', 'harga']
        })
        .then((barang) => {

            res.locals = {
                title: 'Edit Barang',
                data: barang,
            };

            res.render('barang/form');
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.update = (req, res) => {
    Barang
        .update({
            nama_barang: req.body.nama_barang,
            harga: req.body.harga
        }, {
            where: {
                id_barang: req.params.id
            }
        })
        .then((barang) => {
            res.redirect('/barang');
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.destroy = (req, res) => {
    Barang
        .destroy({
            where: {
                id_barang: req.params.id
            }
        })
        .then((barang) => {
            res.redirect('/barang');
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}