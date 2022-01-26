let express = require('express');
let router = express.Router();


//connect to model
let User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find((err, users)=>{
    if(err){
      console.log(err)
      res.send('error occured' + err);
    } else {
      res.send(users);
    }
  })
});

router.post('/register', (req,res,next)=>{
  let newUser = new User({
    "username":req.body.username,
    "password":req.body.password,
    "email":req.body.email,
    "firstName":req.body.firstName,
    "lastName":req.body.lastName
  })

  User.create(newUser, (err, Recipe)=>{
    if (err){
      console.log(err);
      res.end(err);
    } else {
      res.send(Recipe);
      res.end();
    }
  })
})


router.login('/login', (req,res,next)=>{
  
})

module.exports = router;
