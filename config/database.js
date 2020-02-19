const mongoose = require('mongoose')

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes-database'

const setupDB = () => {
    mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {
        console.log('connect to db')
    })
    .catch(err => {
        console.log('error', err)
    })
}

module.exports = setupDB