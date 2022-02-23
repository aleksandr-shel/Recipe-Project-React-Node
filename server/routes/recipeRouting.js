const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = express.Router();

const Recipe = require('../models/recipe');
const user = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    const {authorization} = req.headers;

    const {userId} = req.body;

    if (!authorization){
        return res.status(401).json({message: 'no authorization header sent'})
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded)=>{
        if (err){
            return res.status(401).json({message:'Unable to verify token'})
        }

        const {id} = decoded;

        // if(id !== userId){
        //     return res.status(403).json({message:'Not allowed to add recipe'})
        // }
        let newRecipe = new Recipe({
            recipeName: req.body.recipeName,
            imageUrl: req.body.imageUrl,
            ingredients: req.body.ingredients,
            description: req.body.description,
            instruction: req.body.instruction,
            timeToCook: req.body.timeToCook,
            author: req.body.author
        })
    
        Recipe.create(newRecipe, (err, recipe)=>{
            if (err){
                res.send(err);
            } else {
                res.status(200).send(recipe);
                // const {recipeName, imageUrl, ingredients, description, tomeToCook, author} = recipe

                // jwt.sign({recipeName, imageUrl, ingredients, description, tomeToCook, author}, process.env.JWT_SECRET, {expiresIn:'2d'}, 
                //     (err, token)=>{
                //         if (err){
                //             return res.status(200).json(err);
                //         }
                //         res.status(200).json({token})
                //     })
            }
        })
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