const Book = require('../models/extra')

module.exports.bookList = (req, res) => {
    Book.find()
        .then(books => {
            res.json(books)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.bookCreate = (req, res) => {
    const body = req.body
    Book.insertMany(body)
        .then(books => {
            res.json(books)
        })
        .catch(err => {
            res.json(err)
        })
}