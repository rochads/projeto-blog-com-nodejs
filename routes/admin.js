const express = require('express')
const admin = express.Router()

admin.get('/', (req, res) => {
    res.render('admin/admin')
})

admin.get('/posts', (req, res) => {
    res.send("Página de posts!")
})

admin.get('/categories', (req, res) => {
    res.render('admin/categories')
})

admin.get('/categories/add', (req, res) => {
    res.render('admin/addcategories')
})

admin.post('/categories/new', (req, res) => {
    res.send('Isso não estava na aula 34!!!')
})

module.exports = admin