const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = new Schema({
    name: {
        type: String,
        required: true
    },

    slug: {
        type: String,
        required: true
    },

    // forçando erro no BD na hora de salvar a categoria para testar a error_msg
    /*
    test: {
        type: String,
        required: true
    },
    */

    date: {
        type: Date,
        default: Date.now()
    }
})

/*
Poderia ser:
Const Category = new mongoose.Schema (eliminaria linhas 2 e 4)
*/

mongoose.model('categories', Category)