const express = require('express')
const router = express.Router()
const notesController = require('../app/controllers/notesController')
const categoryController = require('../app/controllers/categoriesController')
const usersController = require('../app/controllers/usersController')
const upload = require('./multer')
const authenticateUser = require('../app/middlewares/authenticateUser')
   
router.post('/api/users/register', usersController.register)
router.post('/api/users/login', usersController.login)
router.delete('/api/users/logout', authenticateUser, usersController.logout)
router.delete('/api/users/logout-all', authenticateUser, usersController.logoutAll)
router.get('/api/users/check-login', authenticateUser, usersController.checkLoginStatus)

router.get('/api/notes', authenticateUser, notesController.list)
router.get('/api/notes/:id', authenticateUser, notesController.show)
router.post('/api/notes', authenticateUser, upload.single('image'), notesController.create)
router.put('/api/notes/:id', authenticateUser, upload.single('image'), notesController.update)
router.delete('/api/notes/:id', authenticateUser, notesController.destroy)

router.get('/api/categories', authenticateUser, categoryController.list)
router.get('/api/categories/:id', authenticateUser, categoryController.show)
router.post('/api/categories', authenticateUser, categoryController.create)
router.put('/api/categories/:id', authenticateUser,  categoryController.update)
router.delete('/api/categories/:id', authenticateUser, categoryController.destroy)

module.exports = router