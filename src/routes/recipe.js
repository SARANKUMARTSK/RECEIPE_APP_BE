import express from 'express'
const router = express.Router();
import RecipeController from '../controller/recipe.js'

router.get('/',RecipeController.getAllRecipe)
router.get('/searchByTitle/:title',RecipeController.searchByRecipeTitle)
router.get('/:id',RecipeController.getRecipeById)
router.post('/',RecipeController.createRecipe)
router.put('/:id',RecipeController.editRecipe)
router.delete('/:id',RecipeController.deleteRecipe)

export default router