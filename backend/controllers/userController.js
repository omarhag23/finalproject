const User = require('../models/User')
const bcryptjs = require('bcryptjs')
  const jsonwebtoken = require('jsonwebtoken')

const UserController = {
//register
registerUser :async (username,email,pass) => {
    console.log('controller  pass : email:', email,'username:', username,'password:', pass,);
    // Validation  to check if user exists!
    const userExists = await User.findOne({email:email})
    if(userExists){
      console.log('User already exists')
      return { userExists: true };
    }

    // I created a hashed represenation of my password!
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(pass,salt)

    console.log('HASHED PASS:', hashedPassword, "salt : ",salt);

    // Code to insert data
    const user = new User({
        username:username,
        email:email,
        password:hashedPassword
    })
    console.log('User object before saving:', user);
    try{
      // Save the user
      const savedUser = await user.save();
      console.log('User object after saving:', savedUser);
      return savedUser;
  } catch (err) {
    console.error('Error saving user controller:', err);
      // Throw error to be caught by the route handler
      throw err;
  }
} ,


authenticateUser: async(username,password)=>{

    // Validation to check if user exists!
     const user = await User.findOne({username:username})
      if(!user){
        console.error('User does not exist')
     } 
    
     if (user)
     {
    // Validation 3 to check user password
      const passwordValidation = await bcryptjs.compare(password,user.password)
      if(!passwordValidation){
        console.error('password wrong')
      }
      else return user;
    }
 }}
module.exports = UserController;