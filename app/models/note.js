const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema (
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        createdAt: {
            type: Date,
            default: new Date()
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
            // required: true
        },
        photoPath: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true
        },
        isPinned: {
            type: Boolean,
            default: false
        }
    }
)

const Note = mongoose.model('Note', noteSchema) 

module.exports = Note