const Province = require('../models').province
const Regency = require('../models').regency
const District = require('../models').district

exports.getProvince = (req, res) => {
    Province
        .findAll()
        .then((prov) => {
            res.status(200).send({
                data: prov
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error
            })
        })
}

exports.getRegency = (req, res) => {
    Regency
        .findAll({
            where: {
                province_id: req.body.id
            },
            attributes: ['id', 'name']
        })
        .then((reg) => {
            res.status(200).send({
                data: reg
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error
            })
        })
}

exports.getDistrict = (req, res) => {
    District
        .findAll({
            where: {
                regency_id: req.body.id
            },
            attributes: ['id', 'name']
        })
        .then((dis) => {
            res.status(200).send({
                data: dis
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error
            })
        })
}