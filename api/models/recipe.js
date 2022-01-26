
let mongoose = require('mongoose');

let recipeModel = mongoose.Schema(
    {
        name: {
            type: String,
            default: ''
        },
        imageUrl:{
            type:String,
            default:''
        },
        ingredients: {
            type: [String],
            default: ['']
        },
        description:{
            type:String,
            default: ''
        },
        timeToCook: {
            type: String,
            default: ''
        },
        author: {
            type: String,
            default: ''
        }
    }, 
    {
        collection:"recipes"
    }
);

module.exports = mongoose.model('Recipe', recipeModel);