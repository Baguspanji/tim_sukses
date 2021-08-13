const User = require('../models').user
const Anggota = require('../models').anggota

exports.index = (req, res) => {
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