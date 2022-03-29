
let mongoose = require('mongoose');

const {Schema} = mongoose;


let recipeModel = mongoose.Schema(
    {
        recipeName: {
            type: String,
            default: ''
        },
        imageUrl:{
            type:String,
            default:''
        },
        ingredients: {
            type: [Schema.Types.Mixed],
            default: []
        },
        description:{
            type:String,
            default: ''
        },
        instruction:{
            type:String,
            default:''
        },
        timeToCook: {
            type: String,
            default: ''
        },
        rating:{
            type:Number,
            default:0
        },
        author: {
            type: Object,
            default: {}
        },
        comments:{
            type:[Schema.Types.Mixed],
            default:[]
        }
    }, 
    {
        collection:"recipes"
    }
);

module.exports = mongoose.model('Recipe', recipeModel);