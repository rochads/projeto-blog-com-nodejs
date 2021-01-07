const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Categoria = new Schema({
    nome: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }
})

/*
Poderia ser:
Const Categoria = new mongoose.Schema (eliminaria linhas 2 e 4)
*/

mongoose.model('categories', Category)