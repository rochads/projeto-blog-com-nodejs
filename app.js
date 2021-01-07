/* LOADING MODULES */
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const admin = require('./routes/admin')
const session = require('express-session')
const flash = require('connect-flash')

/* SETTINGS */
/* session - tem que ser configurado no início*/
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}))
/* flash - tem que ser configurado abaixo da sessão */
app.use(flash())
/* Middleware para trabalhar com sessão */
app.use((req,res,next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})
/* body-parser */
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
/* handlebars */
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
/* mongoose */
//mongoose.Promise = global.Promise // aula 35: desconsiderei, pois não houve explicação (obs: não li documentação!).
mongoose.connect("mongodb://localhost/blogapp").then(() => {
    console.log('Conectado ao MongoDB')
}).catch((err) => {
    (`Houve um problema ao conectar ao MongoDB: ${err}`)
})
/* public */
app.use(express.static(path.join(__dirname, 'public')))

/* ROUTES */

app.get('/', (req, res) => {
    res.send('Página principal!')
})

app.get('/posts', (req, res) => {
    res.send('Lista de posts!')
})

app.use('/admin', admin)

/* OTHERS */
const port = 3000
app.listen(port, () => {
    console.log("Servidor rodando na porta 3000")
})