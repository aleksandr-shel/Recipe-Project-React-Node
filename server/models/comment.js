
const mongoose = require('mongoose');

let commentModel = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    author:{
        type:Object,
        default:{}
    },
    comment: {
        type: String,
        default:''
    }
})

module.exports = mongoose.model('Comment', commentModel);

