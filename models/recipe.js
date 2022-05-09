
let mongoose = require('mongoose');
const Comment = require('../models/comment')
const {Schema} = mongoose;

// let commentModel = mongoose.Schema({
//     date: {
//         type: Date,
//         default: Date.now()
//     },
//     author:{
//         type:Object,
//         default:{}
//     },
//     comment: {
//         type: String,
//         default:''
//     }
// })

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
            type: [Schema.Types.Mixed],
            default:[]
        },
        timeToCook: {
            type: String,
            default: ''
        },
        category:{
            type:[String],
            default:[]
        },
        cuisine:{
            type:String,
            default:''
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
            refs:[Comment],
            default:[]
        }
    }, 
    {
        collection:"recipes"
    }
);

module.exports = mongoose.model('Recipe', recipeModel);