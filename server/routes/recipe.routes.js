const express = require('express');
const router = express.Router();

const recipeCtrl = require('../controllers/recipe.controller');

router.get('/', recipeCtrl.getRecipes);

router.get('/:recipeId', recipeCtrl.getRecipe);

router.post('/', recipeCtrl.addRecipe);

router.put('/:recipeId', recipeCtrl.updateRecipe);

router.delete('/:recipeId', recipeCtrl.deleteRecipe);

router.get('/:recipeId/ingredients', recipeCtrl.getIngredients);

router.get('/random-recipe', recipeCtrl.getRandomRecipe);

router.post('/:recipeId/comments', recipeCtrl.addComment)

router.delete('/:recipeId/comments', recipeCtrl.removeComment)

router.put('/:recipeId/comments/clear', recipeCtrl.clearComments)

router.post('/search', recipeCtrl.searchForRecipes)

module.exports = router;