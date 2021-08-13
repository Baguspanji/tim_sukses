const User = require('../models').user;
const bcrypt = require('bcryptjs')

const jwt = require('../helpers/config_jwt')

exports.signUp = (req, res) => {
    User
        .create({
            username: req.body.username,
            nama: req.body.nama,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })
        .then((user) => {
            res.status(200).send({
                status: true,
                message: 'item created succesfully',
                data: user
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.signIn = (req, res) => {
    User
        .findOne({
            where: {
                username: req.body.username,
            },
        }).then(user => {
            if (!user) {
                return res.status(404).send({
                    status: false,
                    message: "Error",
                    data: {
                        username: req.body.username,
                        accessToken: null,
                    }
                })
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    status: false,
                    message: "Error",
                    data: {
                        username: req.body.username,
                        accessToken: null,
                    },
                })
            }

            var token = jwt.token({ id: user.id_user })

            res.status(200).send({
                status: true,
                message: "Login Success",
                data: {
                    user,
                    accessToken: token,
                },
            })
        }).catch(err => {
            res.status(500).send({
                status: false,
                data: {
                    name: req.body.name,
                    accessToken: null,
                },
                errors: err
            })
        })
}

exports.findOne = (req, res) => {
    User
        .findOne({
            where: {
                id_user: req.user.id
            },
            attributes: ['id_user', 'username', 'nama', 'email']
        })
        .then((user) => {
            res.status(200).send({
                status: true,
                message: 'item succesfully',
                data: user
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}