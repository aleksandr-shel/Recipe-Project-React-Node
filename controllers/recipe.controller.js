const Recipe = require('../models/recipe');
const User = require('../models/user');
const Comment = require('../models/comment');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');
const {Readable} = require('stream');
const uuid = require('uuid');

const {S3}=require('aws-sdk');

const s3 = new S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION
})

const uplaodFileTest = async(req,res)=>{
    const photo = req.files['Photo'];
    const blob = Readable.from(photo.data);
    console.log(blob);
    const key = uuid.v4() + req.files['Photo'].name;
    const uploadedImage = await s3.upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        ContentType: photo.mimetype,
        Body: blob,
      }).promise();

    console.log(uploadedImage.Location);

    res.end();
}


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

        // const photo = req.files['Photo'];
        // const blob = Readable.from(photo.data);
        // console.log(blob);
    
        // const key = uuid.v4() + req.files['Photo'].name
        // const uploadedImage = await s3.upload({
        //     Bucket: process.env.AWS_S3_BUCKET_NAME,
        //     Key: key,
        //     ContentType: photo.mimetype,
        //     Body: blob,
        //   }).promise();
    
        // console.log(uploadedImage.Location);

        let newRecipe = new Recipe({
            recipeName: req.body.recipeName,
            imageUrl: req.body.imageUrl,
            ingredients: req.body.ingredients,
            cuisine: req.body.cuisine,
            category: req.body.category,
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
    let pageNumber = req.query.pageNumber || 1;
    if (pageNumber <=0){
        pageNumber = 1;
    }
    const recipesAmount = req.query.recipesAmount || 20;

    Recipe.find((err, recipes)=>{
        if (err){
            res.send(err);
        } else {
            res.send(recipes);
        }
    }).skip((pageNumber - 1) * recipesAmount).limit(recipesAmount)
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
            cuisine: req.body.cuisine,
            category: req.body.category,
            description: req.body.description,
            instruction: req.body.instruction,
            timeToCook: req.body.timeToCook
        })

        Recipe.findById(recipeId, (err, recipe)=>{
            if (err){
                return res.status(400).send({message:'could not find recipe id',err});
            }
            if (recipe){
                if (recipe.author.id !== id && recipe.author._id !== id){
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
                if (recipe.author.id !== id && recipe.author._id !== id){
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
                    
                    s3.deleteObject({
                        Key:recipe.key
                    }, (err)=>{
                        console.log(err);
                    })
                    
                    return res.status(200).send({message:'Recipe deleted'});
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

const giveRating = async(req,res)=>{

}

const addComment = async(req,res)=>{
    const {recipeId} = req.params;
    const {date, author, comment} = req.body;

    const newComment = new Comment({
        date,
        author,
        comment
    })

    Recipe.findOneAndUpdate(
        {_id:recipeId},
        {$push:{comments:newComment}},
        {new:true},
        (err, recipe)=>{
            if (err){
                return res.status(400).send(err);
            }
            return res.status(200).send(recipe.comments.at(-1));
    })
}

const removeComment = async(req,res)=>{
    const {recipeId} = req.params;
    const {commentId} = req.body;

    Recipe.findOne(
        {_id:recipeId},
        (err, recipe)=>{
            if (err){
                return res.status(400).send(err);
            }

            let comments = recipe.comments.filter(comment =>{
                return comment._id != commentId
            })

            Recipe.updateOne({
                _id:recipeId
            },{
                $set:{comments:comments}
            }, (err)=>{
                if (err){
                    return res.status(400).send(err);
                }
            })

            // recipe.comments.pop()
            return res.status(200).send({success:true});

        }
    )
}


const getRandomRecipe = async (req,res)=>{
    res.send('random-recipe');
}

const clearComments = async(req,res)=>{
    const {recipeId} = req.params;

    Recipe.findOneAndUpdate({
        _id: recipeId
    },{
        $set:{comments:[]}
    },
    (err, recipe)=>{
        if (err){
            return res.status(400).send(err);
        }
        return res.status(200).send(recipe.comments);
    })
}


const searchForRecipes = async(req,res)=>{
    const {query} = req.body;
    Recipe.find(
        {
            $or:[
                {recipeName: new RegExp(query, 'i')},
                {description: new RegExp(query, 'i')},
                {ingredients: new RegExp(query, 'i')}
            ]
        },
        (err, result)=>{
        if (err){
            return res.status(400).send(err);
        }
        return res.status(200).send(result)
    })
}


// do not need yet
const uploadRecipeImage = async(req,res)=>{
    try{
        if (!req.files){
          res.send({
            status:false,
            message: 'no file uploaded'
          });
        }else {
          let avatar = req.files.avatar;
          avatar.mv('./uploads/' + avatar.name);
    
          res.send({
            status: true,
            message: 'file uploaded',
            data: {
              name: avatar.name,
              mimetype: avatar.mimetype,
              size: avatar.size
            }
          });
        }
    }catch(err){
        res.status(500).send(err);
    }
}

const addFavouriteRecipe = async (req, res) =>{
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

        User.findOneAndUpdate(
            {_id:id},
            {$addToSet:{favoriteRecipes:recipeId}},
            // {$set: {favoriteRecipes: []}},
            (err)=>{
                if(err){
                    return res.status(400).send(err);
                }
                return res.status(200).end();
            }
        )
    })
}

const removeFavouriteRecipe = async (req, res) =>{
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

        User.findOneAndUpdate(
            {_id:id},
            {$pull:{favoriteRecipes:recipeId}},
            // {$set: {favoriteRecipes: []}},
            (err)=>{
                if(err){
                    return res.status(400).send(err);
                }
                return res.status(200).end();
            }
        )
    })
}

const getFavorites = async (req,res)=>{
    const {authorization} = req.headers;
    if (!authorization){
        return res.status(401).json({message:'no authorization header sent'})
    }

    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded)=>{
        if (err){
            return res.status(401).json({message:'unable to verify token or token has expired'})
        }
        const {id} = decoded;

        User.findOne({_id:id}, (err, user)=>{
            if (err){
                return res.status(400).send(err);
            }
            let ids = user.favoriteRecipes
            ids.map(
                id =>{
                    return ObjectId(id);
                }
            )
            Recipe.find(
                {_id:{$in: ids}},
                (err, recipes)=>{
                    if (err){
                        return res.status(400).send(err);
                    }
                    return res.status(200).send(recipes)
                }
            )
        })
    })
}

module.exports={
    addRecipe,
    updateRecipe,
    getRecipe,
    deleteRecipe,
    getRecipes,
    getIngredients,
    getRandomRecipe,
    addComment,
    removeComment,
    giveRating,
    clearComments,
    searchForRecipes,
    addFavouriteRecipe,
    removeFavouriteRecipe,
    getFavorites,
    uplaodFileTest
}