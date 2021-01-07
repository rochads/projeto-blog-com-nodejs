/* LOADING MODULES */
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
//const mongoose = require('mongoose)
const path = require('path')
const admin = require('./routes/admin')

/* SETTINGS */
/* body-parser */
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
/* handlebars */
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
/* mongoose */
// em breve
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