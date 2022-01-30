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
      if (err.code === 11000){
        return res.status(422).send({message:'User already exists'});
      }
      res.send(err);
    } else {
      res.send(Recipe);
    }
  })
})


router.post('/login', (req,res,next)=>{
  
  let loginUser = {
    username: req.body.username,
    password: req.body.password
  }
  
  User.findOne(loginUser, (err, user)=>{
    if (err){
      res.send(err);
    } else {
      if (user){
        res.send(user.id);
      }
      else {
        res.send({message:'user not found or incorrect password'})
      }
    }
  })
})

router.delete('/delete/:id', (req,res)=>{
  let id = req.params.id;
  User.remove({_id:id},(err)=>{
    if (err){
      res.send(err);
    } else {
      res.send({message:"User was deleted"})
    }
  })
})


router.post('/upload-avatar', async(req,res)=>{
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
})

module.exports = router;
