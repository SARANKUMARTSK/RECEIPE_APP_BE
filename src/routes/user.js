import express from 'express'
const router = express.Router()
import UserController from '../controller/user.js'

router.get('/',UserController.getAllUser)
router.get('/:id',UserController.getUserById)
router.post('/signup',UserController.createUser)
router.post('/login',UserController.login)
router.put('/edit/:id',UserController.editUserById)
router.delete('/delete/:id',UserController.deleteUserById)
router.post('/:userId/recipe/:recipeId',UserController.saveRecipe)
router.post('/forgotPassword',UserController.forgotMail)
router.post('/resetPassword/:token',UserController.resetPassword)

export default router