import express from 'express'
const router = express.Router();
import RecipeController from '../controller/recipe.js'
import UserGaurd from '../middleware/UserGaurd.js';
import AdminGaurd from '../middleware/AdminGaurd.js';

router.get('/',UserGaurd,RecipeController.getAllRecipe)
router.get('/searchByTitle/:title',UserGaurd,RecipeController.searchByRecipeTitle)
router.get('/:id',UserGaurd,RecipeController.getRecipeById)
router.post('/',AdminGaurd,RecipeController.createRecipe)
router.put('/:id',AdminGaurd,RecipeController.editRecipe)
router.delete('/:id',AdminGaurd,RecipeController.deleteRecipe)

export default router