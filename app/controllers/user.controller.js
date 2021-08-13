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