let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

//adding environmental variables from .env
require('dotenv').config()

const fileUpload = require('express-fileupload');
const cors = require('cors');
let mongoose = require('mongoose');
let DB = require('./db');


mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open',()=>{
    console.log('Connected to MongoDB...');
});

let userRouting = require('../routes/user.routes');
let recipeRouting = require('../routes/recipe.routes');

let app = express();

app.use(express.static(path.join(__dirname, '../wwwroot')));

// app.set('view engine','html')

app.use(fileUpload({
    createParentPath: true
}));


app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());


//routing
app.use('/api/users', userRouting);
app.use('/api/recipes', recipeRouting);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..','wwwroot', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
  
  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { title: 'Error'});
});

module.exports = app;
