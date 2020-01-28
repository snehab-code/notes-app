//moved the entire db configuration here

const mongoose = require('mongoose')

const setupDB = () => {
    mongoose.connect('mongodb://localhost:27017/notes-database', { useNewUrlParser: true, useUnifiedTopology: true})
    // seems to work without the 27017
    .then(()=> {
        console.log('connect to db')
    })
    .catch(err => {
        console.log('error', err)
    })
}

module.exports = setupDB