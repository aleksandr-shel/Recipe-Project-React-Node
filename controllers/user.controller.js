const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


let User = require('../models/user');


const getUsers = async (req,res)=>{
    User.find((err, users)=>{
        if(err){
          console.log(err)
          res.send('error occured' + err);
        } else {
          res.send(users);
        }
      })
}

const register = async (req,res)=>{
    const {email, password, firstName, lastName} = req.body;

    const user = await User.findOne({email});
  
    if(user){
      return res.status(409).json({message:'email is already registered'});
    }
    const passwordHash = await bcrypt.hash(password, 10);
  
    let newUser = new User({
      email,
      passwordHash,
      firstName,
      lastName,
      isVerified: false
    })
  
    User.create(newUser, (err, result)=>{
      if (err){
        res.send(err);
      }
      const insertedId = result._id;
      console.log(insertedId);
      jwt.sign({
        id: insertedId,
        email,
        firstName,
        lastName,
        isVerified: false
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2d'
      }, 
      (err, token)=>{
        if(err){
          return res.status(500).send(err);
        }
        res.status(200).json({token});
      }
      )
    })
}

const login = async (req,res)=>{
    const {email, password} = req.body;

    User.findOne({email}, async (err, user)=>{
      if (err){
        res.send(err)
      }
      if (!user){
        return res.status(401).json({message:'email or password are incorrect'});
      }
  
      const {id, passwordHash, firstName, lastName, recipes} = user;
  
      const isCorrect = await bcrypt.compare(password, passwordHash);
  
      if(isCorrect){
        jwt.sign({id, email, firstName, lastName, recipes},
          process.env.JWT_SECRET, 
          {expiresIn: '2d'},
          (err, token)=>{
            if (err){
              res.status(500).json(err);
            }
            res.status(200).json({token});
          })
      } else {
        res.status(401).json({message:'email or password are incorrect'});
      }
  
    })
}


const deleteUser = async (req,res)=>{
    let id = req.params.id;
    User.remove({_id:id},(err)=>{
      if (err){
        res.send(err);
      } else {
        res.send({message:"User was deleted"})
      }
    })
}

const uploadImage = async (req,res)=>{
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

const checkToken = async (req,res)=>{
  const {authorization} = req.headers;
  if (!authorization){
    return res.status(401).json({message:'no authorization header sent'})
  }

  const token = authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, async(err, decoded)=>{
    if (err){
      return res.status(401).json({message:'unable to verify token or token has expired'})
    }

    return res.status(200).json({message: 'all good'})
  })
}

const getCurrentUser = async (req,res)=>{
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

    User.findOne({_id:id}, (err, result)=>{
      if (err){
        return res.status(400).send(err);
      }
      return res.status(200).send(result);
    })
  })
}

module.exports = {
    getUsers,
    register,
    login,
    deleteUser,
    uploadImage,
    checkToken,
    getCurrentUser
}