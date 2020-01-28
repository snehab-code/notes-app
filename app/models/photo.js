const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photoSchema = {
    filePath: {
        type: String,
        required: true
    },
    notes: [Schema.Types.ObjectId]
}

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo

// a way to reuse photos