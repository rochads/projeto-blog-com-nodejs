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

    // adicionado .lean() para listar categorias
    // adicionar .sort({date: 'desc'}) depois de .lean() para listar do mais novo para mais antigo
    Category.find().lean().then((categories) => {
        //console.log(categories)
        res.render('admin/categories', {categories: categories})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias!")
        res.redirect('/admin')
    })

})

admin.get('/categories/add', (req, res) => {
    res.render('admin/addcategories')
})

admin.post('/categories/new', (req, res) => {

    let errors = []

    if (!req.body.name) {
        errors.push({text: "Nome inválido!"})
    } 
    
    if (!req.body.slug) {
        errors.push({text: "Slug inválido!"})
    }

    if (req.body.name.length < 2) {
        errors.push({text: "Nome muito curto!"})
    }

    if (errors.length > 0) {
        res.render('admin/addcategories', {errors: errors})
    } else {
        const newCategory = {
            name: req.body.name,
            slug: req.body.slug
        }
    
        new Category(newCategory).save().then(() => {
            req.flash("success_msg", "Categoria salva com sucesso!")
            res.redirect('/admin/categories')
        }).catch((err) => {
            console.log(`Houve um erro ao salvar a categoria: ${err}`)
            req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente!")
            res.redirect('/admin/categories')
        })
    }
})

module.exports = admin