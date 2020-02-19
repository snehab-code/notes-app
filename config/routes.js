const express = require('express')
const router = express.Router()
const notesController = require('../app/controllers/notesController')
const categoryController = require('../app/controllers/categoriesController')
const usersController = require('../app/controllers/usersController')
const upload = require('./multer')
const authenticateUser = require('../app/middlewares/authenticateUser')
   
router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.delete('/users/logout', authenticateUser, usersController.logout)
router.delete('/users/logout-all', authenticateUser, usersController.logoutAll)
router.get('/users/check-login', authenticateUser, usersController.checkLoginStatus)

router.get('/notes', authenticateUser, notesController.list)
router.get('/notes/:id', authenticateUser, notesController.show)
router.post('/notes', authenticateUser, upload.single('image'), notesController.create)
router.put('/notes/:id', authenticateUser, upload.single('image'), notesController.update)
router.delete('/notes/:id', authenticateUser, notesController.destroy)

router.get('/categories', authenticateUser, categoryController.list)
router.get('/categories/:id', authenticateUser, categoryController.show)
router.post('/categories', authenticateUser, categoryController.create)
router.put('/categories/:id', authenticateUser,  categoryController.update)
router.delete('/categories/:id', authenticateUser, categoryController.destroy)

module.exports = router