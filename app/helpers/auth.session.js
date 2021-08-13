exports.auth = (req, res) => {
    sess = req.session;

    console.log(sess);
    if (sess.username == null) res.redirect('/login');
}