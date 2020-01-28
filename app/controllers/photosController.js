const Photo = require('../models/photo')

const upload = multer({storage: storage})

module.exports.list = (req,res) => {
    Photo.find()
        .then()
        .catch()
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Photo.findById(id)
        .then()
        .catch()
}

module.exports.create = (req, res) => {
    const file = req.file
    // this is triggered on upload, so if file is uploaded
    if (file) {
        const body = {
            filePath: `/${file.destination}/${file.fileName}`,
            notes: []
        }
        // create a model shaped object
        const photo = new Photo(body)
        // make a document with that and save it.
        photo.save()
            .then(photo => {
                if(photo) {
                    res.json(photo)
                    // will send back the photo model data, not the file data. Can always change if I think I'll need more info?
                } else {
                    res.json({})
                }
            })
    } else {
        res.json({})
    }
}

module.exports.update = (req,res) => {
    const id = req.params.id
    Photo.findByIdAndUpdate(id)
        .then()
        .catch()
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    Photo.findByIdAndDelete(id)
        .then()
        .catch()
}

