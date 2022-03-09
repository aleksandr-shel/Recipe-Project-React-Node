const Recipe = require('../models/recipe');
const User = require('../models/user');

const jwt = require('jsonwebtoken');

const addRecipe = async (req,res)=>{
    const {authorization} = req.headers;

    if (!authorization){
        return res.status(401).json({message: 'no authorization header sent'})
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded)=>{
        if (err){
            return res.status(401).json({message:'Unable to verify token'})
        }
        let newRecipe = new Recipe({
            recipeName: req.body.recipeName,
            imageUrl: req.body.imageUrl,
            ingredients: req.body.ingredients,
            description: req.body.description,
            instruction: req.body.instruction,
            timeToCook: req.body.timeToCook,
            author: req.body.author
        })

        const {id} = decoded;
    
        Recipe.create(newRecipe, (err, recipe)=>{
            if (err){
                res.send(err);
            } else {

                User.findOneAndUpdate({_id:id},
                    {$addToSet:{userRecipes:recipe._id}},
                    (err)=>{
                        if (err){
                            res.status(500).send(err)
                        }
                        res.status(200).send(recipe);
                    }
                )
            }
        })
    })
}

const getRecipes = async (req,res)=>{
    Recipe.find((err, recipes)=>{
        if (err){
            res.send(err);
        } else {
            res.send(recipes);
        }
    })
}

const getRecipe =async (req,res)=>{
    
    const {recipeId} = req.params;

    Recipe.findById(recipeId, (err, result)=>{
        if (err){
            res.status(400).send(err);
        }
        res.status(200).send(result);
    })
}

const updateRecipe = async (req,res)=>{
    const {authorization} = req.headers;

    if (!authorization){
        return res.status(401).json({message: 'no authorization header sent'})
    }

    const token = authorization.split(' ')[1];

    const {recipeId} = req.params;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded)=>{
        if (err){
            return res.status(401).json({message:'Unable to verify token'})
        }

        const {id} = decoded;

        let updatedRecipe = Recipe({
            _id:recipeId,
            recipeName: req.body.recipeName,
            imageUrl: req.body.imageUrl,
            ingredients: req.body.ingredients,
            description: req.body.description,
            instruction: req.body.instruction,
            timeToCook: req.body.timeToCook
        })

        Recipe.findById(recipeId, (err, recipe)=>{
            if (err){
                return res.status(400).send({message:'could not find recipe id',err});
            }
            if (recipe){
                if (recipe.author.id !== id){
                    return res.status(401).send({message: 'not allowed to update this recipe'});
                }
            }
            Recipe.findOneAndUpdate({_id: recipeId}, updatedRecipe, {new:true}, (err,resultRecipe)=>{
                if (err){
                    return res.send(err);
                } else {
                    res.status(200).send(resultRecipe);
                }
            });
        })
    })
}

const deleteRecipe = async (req,res)=>{
    const {authorization} = req.headers;


    if (!authorization){
        return res.status(401).json({message: 'no authorization header sent'})
    }

    const token = authorization.split(' ')[1];

    const {recipeId} = req.params;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded)=>{
        if (err){
            return res.status(401).json({message:'Unable to verify token'})
        }

        const {id} = decoded;

        Recipe.findById(recipeId, (err, recipe)=>{
            if (err){
                res.status(400).send({message:'could not find recipe id',err});
            }
            if (recipe){
                if (recipe.author.id !== id){
                    return res.status(401).send({message: 'not allowed to delete this recipe'});
                }
            }
            Recipe.deleteOne({_id: recipeId},(err)=>{
                if (err){
                    return res.status(400).send(err);
                } else {
                    User.findOneAndUpdate({_id:id},
                        {$pull:{userRecipes:recipeId}},
                        (err)=>{
                            if (err){
                                return res.status(500).send({message:'could not remove in user recipes array'})
                            }
                        })
                    return res.send({message:'Recipe deleted'});
                }
            })
        })
    })
}

const getIngredients = async (req,res)=>{
    const recipeId = req.params;
    Recipe.findOne({_id:recipeId}, (err, recipe)=>{
        if (err){
            res.send({message: err});
        }else {
            res.send(recipe.ingredients);
        }
    })
}

const getRandomRecipe = async (req,res)=>{
    res.send('random-recipe');
}


module.exports={
    addRecipe,
    updateRecipe,
    getRecipe,
    deleteRecipe,
    getRecipes,
    getIngredients,
    getRandomRecipe
}