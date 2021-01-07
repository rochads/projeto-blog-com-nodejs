const express = require('express')
const admin = express.Router()

admin.get('/', (req, res) => {
    res.render('admin/admin')
})

admin.get('/posts', (req, res) => {
    res.send("Página de posts!")
})

admin.get('/categorias', (req, res) => {
    res.send("Página de categorias!")
})

module.exports = admin