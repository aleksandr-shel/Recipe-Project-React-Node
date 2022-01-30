const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipe');
const user = require('../models/user');

router.get('/',(req,res)=>{

    Recipe.find((err, recipes)=>{
        if (err){
            res.send(err);
        } else {
            res.send(recipes);
        }
    })
})


router.post('/add',(req,res)=>{
    let newRecipe = new Recipe({
        recipeName: req.body.recipeName,
        imageUrl: req.body.imageUrl,
        ingredients: req.body.ingredients,
        description: req.body.description,
        timeToCook: req.body.timeToCook,
        author: req.body.author
    })

    Recipe.create(newRecipe, (err, recipe)=>{
        if (err){
            res.send(err);
        } else {
            res.send(recipe);
        }
    })
});


router.put('/update/:id',(req,res)=>{
    const id = req.params.id;

    let updatedRecipe = Recipe({
        _id:id,
        recipeName: req.body.recipeName,
        imageUrl: req.body.imageUrl,
        ingredients: req.body.ingredients,
        description: req.body.description,
        timeToCook: req.body.timeToCook,
        author: req.body.author
    })

    Recipe.updateOne({_id: id}, updatedRecipe, (err)=>{
        if (err){
            res.send(err);
        } else {
            res.send(updatedRecipe);
        }
    });
});

router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    Recipe.remove({_id: id},(err)=>{
        if (err){
            res.send(err);
        } else {
            res.send({message:'Recipe deleted'});
        }
    })
});


router.get('/:id/ingredients', (req,res)=>{
    const id = req.params.id;
    Recipe.findOne({_id:id}, (err, recipe)=>{
        if (err){
            res.send({message: err});
        }else {
            res.send(recipe.ingredients);
        }
    })
});


router.get('/random-recipe', (req,res)=>{
    res.send('random-recipe');
});



module.exports = router;