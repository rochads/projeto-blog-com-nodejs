if (process.env.NODE_ENV == "production") {
    module.exports = {mongoURI: /* link de conexão do DB */ ""}
} else {
    module.exports = {mongoURI: "mongodb://localhost/blogapp"}
}