
let mongoose = require('mongoose');

let Recipe = require('./recipe')

const {Schema} = mongoose;

let User = mongoose.Schema(
    {
        username: {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'
        },
        password:{
            type:String,
            default: '',
            trim: true,
            required: 'password is required'
        },
        email:{
            type:String,
            default:'',
            trim: true,
            required: 'email address is required'
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
        recipes:{
            type: [Schema.Types.Mixed],
            default: []
        }
    }, {
        collection:"users"
    }
)

module.exports = mongoose.model('User', User);
