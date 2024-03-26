const User = require('../models/User')
const bcryptjs = require('bcryptjs')
  const jsonwebtoken = require('jsonwebtoken')

const UserController = {
//register
registerUser :async (username,email,password) => {
    console.log('controller : email:', email,'username:', username,'password:', password,);
    // Validation  to check if user exists!
    const userExists = await User.findOne({email:email})
    if(userExists){
      return res.status(400).send({message:'User already exists'})
    }

    // I created a hashed represenation of my password!
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(password,salt)

    // Code to insert data
    const user = new User({
        username:username,
        email:email,
        password:hashedPassword
    })
    try{
      // Save the user
      const savedUser = await user.save();
      return savedUser;
  } catch (err) {
      // Throw error to be caught by the route handler
      throw err;
  }
} ,


authenticateUser: async(username,password)=>{

    // Validation 1 to check user input
   const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // Validation 2 to check if user exists!
     const user = await User.findOne({username:req.body.username})
      if(!user){
         return res.status(400).send({message:'User does not exist'})
     } 
    
    // Validation 3 to check user password
      const passwordValidation = await bcryptjs.compare(req.body.password,user.password)
      if(!passwordValidation){
          return res.status(400).send({message:'Password is wrong'})
      }
      else return user;
    
 }}
module.exports = UserController;