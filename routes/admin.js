const express = require('express')
const admin = express.Router()

const mongoose = require("mongoose")
require("../models/Category")
const Category = mongoose.model("categories")

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

    const newCategory = {
        name: req.body.name,
        slug: req.body.slug
    }

    new Category(newCategory).save().then(() => {
        console.log("Categoria salva com sucesso!")
    }).catch((err) => {
        console.log(`Houve um erro ao salvar a categoria: ${err}`)
    })

})

module.exports = admin