// const { Router } = require('express') // apareceu sozinho (?)
const express = require('express')
const admin = express.Router()

const mongoose = require("mongoose")
require("../models/Category")
const Category = mongoose.model("categories")
require("../models/Post")
const Post = mongoose.model("posts")

admin.get('/', (req, res) => {
    res.render('admin/admin')
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

admin.get('/categories/edit/:id', (req, res) => {
        Category.findOne({_id: req.params.id}).lean().then((category) => {
            res.render("admin/editcategories", {category: category})
        }).catch((err) => {
            req.flash("error_msg", "Erro! Tente novamente.")
            res.redirect("/admin/categories")
        })
})

admin.post('/categories/edit', (req, res) => {
    // sem sistema de validação para não ficar repetitivo!
    Category.findOne({_id: req.body.id}).then((category) => {

        category.name = req.body.name
        category.slug = req.body.slug

        category.save().then(() => {
            req.flash("success_msg", "Categoria salva com sucesso!")
            res.redirect('/admin/categories')
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao salvar a edição da categoria!")
            res.redirect("/admin/categories")
        })

    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao editar a categoria!")
        res.redirect("/admin/categories")
    })
})

admin.post("/categories/delete", (req, res) => {
    Category.remove({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Categoria deletada com sucesso!")
        res.redirect('/admin/categories')
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao deletar a categoria!")
        res.redirect("/admin/categories")
    })
})

admin.get('/posts', (req, res) => {
    res.render('admin/posts')
})

admin.get('/posts/add', (req, res) => {
    
    Category.find().lean().then((categories) => {
        res.render('admin/addposts', {categories: categories})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar as categorias!")
        res.redirect("/admin")
    })
    
})

admin.post('/posts/new', (req, res) => {

    let errors = []

    if (req.body.category == "0") {
        errors.push({text: "Categoria inválida! Registre uma categoria."})
    }

    if (errors.length > 0) {
        res.render("admin/addposts", {errors: errors})
    } else {
        const newPost = {
            title: req.body.title,
            slug: req.body.slug,
            description: req.body.description,
            content: req.body.content,
            category: req.body.category
        }
        new Post(newPost).save().then(() => {
            req.flash("success_msg", "Postagem salva com sucesso!")
            res.redirect('/admin/posts')
        }).catch((err) => {
            console.log(err)
            req.flash("error_msg", "Houve um erro ao salvar a postagem!")
            res.redirect('/admin/posts')
        })
    }

})

module.exports = admin