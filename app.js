/* LOADING MODULES */
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
//const mongoose = require('mongoose)

/* SETTINGS */
/* body-parser */
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
/* handlebars */
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
/* mongoose */
// em breve

/* ROUTES */







/* OTHERS */
const port = 3000
app.listen(port, () => {
    console.log("Servidor rodando na porta 3000")
})