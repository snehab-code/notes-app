const Note = require('../models/note')
// const photosController = require('../controllers/photosController')
// const Photo = require('../models/photo')
const fs = require('fs')

// function promisifyImages(note) {
//     return new Promsie((resolve, reject) => {
//         fs.readFile(`.${note.photoPath}`, (err, data) => {
//             if (err) throw err
//             note._doc.image = data
            
//         })
//     })
// }

// module.exports.list = (req, res) => {
//     Note.find().populate('category', ['_id', 'name']).populate('photo')
//     // category here is field name
//         .then((notes) => {
//             const response = []
//             const promises = []
//             notes.forEach(note => {
//                 promises.push(promisifyImages(note))
//                 Promise.all(promises)   
//                     .then(values => {
                        
//                     })
//                 if (note.photoPath) {
                 
//                 } else {
//                     response.push(note._doc)
//                     if (response.length === notes.length) {
//                         res.json(response)
//                     }
//                 }
//             })
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }
// module.exports.list = (req, res) => {
//     Note.find().populate('category', ['_id', 'name']).populate('photo')
//     // category here is field name
//         .then((notes) => {
//             const response = []
//             // GET RID OF THIS, express.static is enough to make it work!
//             notes.forEach(note => {
//                 if (note.photoPath) {
//                     fs.readFile(`.${note.photoPath}`, (err, data) => {
//                         if (err) throw err
//                         note._doc.image = data
//                         response.push(note._doc)
//                         if (response.length === notes.length) {
//                             res.json(response)
//                         }
//                     })
//                 } else {
//                     response.push(note._doc)
//                     if (response.length === notes.length) {
//                         res.json(response)
//                     }
//                 }
//             })
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }

module.exports.list = (req, res) => {
    Note.find().populate('category', ['_id', 'name']).populate('photo')
    // category here is field name
        .then((notes) => {
            // GET RID OF THIS, express.static is enough to make it work!
            res.json(notes)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Note.findById(id).populate('category')
        .then(note =>  {
            if (note) {
                if (note.photoPath) {
                    // can I rewrite this with promise.all? But this isn't a promise. 

                    fs.readFile(`.${note.photoPath}`, (err,data) => {
                        if (err) throw err;
                        const response = {
                            _id: note._id,
                            title: note.title,
                            category: note.category,
                            description: note.description,
                            photoPath: note.photoPath,
                            image: data
                        }
                        res.json(response)
                    })
                } else {
                    res.json(note)
                }
                //  res.sendFile(note.photoPath, {root: '.' })
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
        note.save()
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })
}


module.exports.destroy = (req, res) => {
    const id = req.params.id
    Note.findByIdAndDelete(id)
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
    console.log('body1', body)
    const id = req.params.id
    if (req.file) {
        const file = req.file
        body.photoPath = `/${file.destination}/${file.filename}`
        console.log('body', body)
    }
    Note.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then((note) => {
            console.log('note', note)
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
    Note.findById(id)
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