const User = require('../models/User');
const bcryptjs = require('bcryptjs');
  const jsonwebtoken = require('jsonwebtoken');
  const Blockchain = require('../routes/blockchain');

const UserController = {
//register
registerUser: async (username, email, pass) => {
  try {
    console.log('controller pass: email:', email, 'username:', username, 'password:', pass);

    // Check if email already exists
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      console.log('User already exists with this email');
      return { userExists: true, success: false, message: 'User already exists with this email' };
    }

    // Check if username already exists
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
      console.log('User already exists with this username');
      return { userExists: true, success: false, message: 'User already exists with this username' };
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(5); // Increased salt rounds for better security
    const hashedPassword = await bcryptjs.hash(pass, salt);
    console.log('Hashed password:', hashedPassword);

    // Generate Ethereum address (assuming Blockchain.getAddress is an asynchronous function)
    const count = await User.countDocuments();
    const ethAddress = await Blockchain.getAddress(count);

    // Create new user object
    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      ethAddress: ethAddress
    });

    // Save the user
    const savedUser = await newUser.save();
    console.log('User saved:', savedUser);

    // Return success response
    return { success: true, message: 'User registered successfully' };
  } catch (err) {
    console.error('Error saving user:', err);
    // Return error response
    return { success: false, message: 'Error encountered while registering user' };
  }
},

checkBalance : async (username) => {

  const user = await User.findOne({username:username});
  const addy = user.ethAddress;
  const balance = Blockchain.getBalance(addy);
  return balance;
},





authenticateUser: async(username,password)=>{

    // Validation to check if user exists!
     const user = await User.findOne({username:username})
      if(!user){
        console.error('User does not exist')
        return { success: false, message: 'User does not exist' };
     } 
    
     if (user)
     {

    // Validation 3 to check user password
      const passwordValidation = await bcryptjs.compare(password,user.password);
      if(!passwordValidation){
        console.error('password wrong')
        return { success: false, message: 'Password or Username Wrong!' };
      }
      else {return user;}
    }
 }}
module.exports = UserController;