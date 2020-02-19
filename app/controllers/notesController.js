const Note = require('../models/note')
const Category = require('../models/category')
const fs = require('fs')

module.exports.list = (req, res) => {
    Note.find({user: req.user._id}).populate('category', ['_id', 'name']).populate('photo')
        .then((notes) => {
            res.json(notes)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Note.findOne({_id: id, user: req.user._id}).populate('category', ['_id', 'name'])
        .then(note =>  {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch ((err) => {
            res.json(err)
        })
}

module.exports.create = (req, res) => { 
        const body = req.body
        if (req.file) {
            const file = req.file
            body.photoPath = `/${file.destination}/${file.filename}`
        }
        const note = new Note(body)
        note.user = req.user._id
        note.save()
        .then((note) => {
            // make this a post hook eventually
            Category.findOne({_id: note.category, user: req.user._id}, '_id name')
                .then(category => {
                    note.category = {
                        _id: category._id,
                        name: category.name
                    }
                    res.json(note)
                })
                .catch(err => {
                    res.json(err)
                })
        })
        .catch((err) => {
            res.json(err)
        })
}


module.exports.destroy = (req, res) => {
    const id = req.params.id
    Note.findOneAndDelete({_id: id, user: req.user._id})
        .then((note) => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.update = (req,res) => {
    const body = req.body
    const id = req.params.id
    if (req.file) {
        const file = req.file
        body.photoPath = `/${file.destination}/${file.filename}`
    }
    Note.findOneAndUpdate({_id: id, user: req.user._id}, body, {new: true, runValidators: true}).populate('category', ['_id', 'name'])
        .then((note) => {
            if(note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.duplicate = (req, res) => {
    const id = req.params.id
    Note.findOne({_id: id, user: req.user._id})
        .then(foundNote => {
            const duplicate = {...foundNote._doc}
            delete duplicate._id
            const note = new Note(duplicate)
            note.save()
                .then(note => {
                    res.json(note)
                })
                .catch(err => res.json(err))
        })
        .catch(err => res.json(err))
}