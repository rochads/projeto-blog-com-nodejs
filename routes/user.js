const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/User")
const User = mongoose.model("users")

router.get("/signup", (req, res) => {
    res.render("user/signup")
})

router.post("/signup", (req, res) => {
    let errors = []

    if (!req.body.name) {
        errors.push({text: "Nome inválido"})
    }
    if (!req.body.email) {
        errors.push({text: "E-mail inválido"})
    }
    if (!req.body.password) {
        errors.push({text: "Senha inválida"})
    }
    if (!req.body.password < 4) {
        errors.push({text: "Senha muito curta"})
    }
    if (req.body.password != req.body.password2) {
        errors.push({text: "Senhas não conferem"})
    }
    if (errors.length > 0) {
        
        res.render("user/signup", {errors: errors})

    } else {
        // próxima aula!
    }
})

module.exports = router