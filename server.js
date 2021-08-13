require('dotenv').config()
const env = process.env
const express = require('express')
const cors = require('cors')
const path = require('path')

const expressLayouts = require('express-ejs-layouts');

const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash');

const {
    sequelize
} = require('./app/models');

const PORT = env.LISTEN_PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

var sesi = {
    secret: env.ACCESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000, }
}

if (env.NODE_ENV === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sesi.cookie.secure = true // serve secure cookies
}

app.use(cookieParser('secret'))
app.use(session(sesi))
app.use(flash());

app.use(express.static(path.join(__dirname, '/app/public')));

app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout', 'layouts/layout');

// app.set('layout extractScripts', true)
// app.set('layout extractStyles', true)

require('./app/router/router.api')(app)
require('./app/router/router.web')(app)

try {
    app.listen(PORT, () => console.log(`Server listen on http://localhost:${PORT}`))
} catch (error) {
    console.error('Unable to start server:', error);
}

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}