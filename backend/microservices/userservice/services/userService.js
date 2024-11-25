const User = require('../models/userModel');

const register = async (data)=>{
    const {name, email,password} = data;
     // validate input values
     const user= await User.create(data);
     return user
}

const login = async (data) => {
    const {email, password} = data;
    // validate input values
    const user= await User.findOne({email: email});
    const isPasswordValid = await user.isPasswordMatch(password, user.password)
      const accessToken= await user.generateAccessToken();
      const loginUser= await User.findById(user._id).select("-password ");
    
    return {user:loginUser, accessToken:accessToken}
}

module.exports = {register, login};