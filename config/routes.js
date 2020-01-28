// links index and controller
// like app.js
const express = require('express')
const router = express.Router()
const notesController = require('../app/controllers/notesController')
// const Category = require('../app/models/category') // populate will give an error if you don't import categoryController because the category MODEL is not in scope. For some reason if you're not enabling querying on a model, but are using it to populate a field, remember to import that model here!
const categoryController = require('../app/controllers/categoriesController')
const extrasController = require('../app/controllers/extrasController')
const multer = require('multer')
   
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        console.log(file)
      cb(null, Date.now()+file.originalname) 
    }
});

const upload = multer({ storage: storage })


router.get('/notes', notesController.list)
router.get('/notes/:id', notesController.show)
router.post('/notes', upload.single('image'), notesController.create)
router.put('/notes/:id', upload.single('image'), notesController.update)
router.delete('/notes/:id', notesController.destroy)
// router.copy('/notes/:id', notesController.duplicate)

router.get('/categories', categoryController.list)
router.get('/categories/:id', categoryController.show)
router.post('/categories', categoryController.create)
router.put('/categories/:id', categoryController.update)
router.delete('/categories/:id', categoryController.destroy)

router.get('/books', extrasController.bookList)
router.post('/books', extrasController.bookCreate)

module.exports = router