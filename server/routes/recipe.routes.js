const express = require('express');
const router = express.Router();

const recipeCtrl = require('../controllers/recipe.controller');

router.get('/', recipeCtrl.getRecipes);

router.get('/:recipeId', recipeCtrl.getRecipe);

router.post('/add', recipeCtrl.addRecipe);

router.put('/update/:recipeId', recipeCtrl.updateRecipe);

router.delete('/delete/:recipeId', recipeCtrl.deleteRecipe);

router.get('/:recipeId/ingredients', recipeCtrl.getIngredients);

router.get('/random-recipe', recipeCtrl.getRandomRecipe);

module.exports = router;