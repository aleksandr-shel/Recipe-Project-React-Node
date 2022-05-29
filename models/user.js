
let mongoose = require('mongoose');

let Recipe = require('./recipe')

const {Schema} = mongoose;

let User = Schema(
    {
        email:{
            type:String,
            default:'',
            trim: true,
            required: 'email address is required',
            unique: true,
            dropDups: true
        },
        passwordHash:{
            type:String,
            default:''
        },
        firstName:{
            type: String,
            default: '',
            trim: true,
            required: 'firstname is required'
        },
        lastName:{
            type: String,
            default: '',
            trim: true,
            required: 'lastname is required'
        },
        userRecipes:{
            type: [String],
            default: []
        },
        favoriteRecipes:{
            type: [],
            default: []
        }
    }, {
        collection:"users"
    }
)

module.exports = mongoose.model('User', User);
