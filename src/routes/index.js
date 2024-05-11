import express from 'express'
const router = express.Router()
import UserRoutes from './user.js'
import RecipeRoutes from './recipe.js'


router.use('/user',UserRoutes)
router.use('/recipe',RecipeRoutes)


export default router