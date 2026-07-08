const {generateAccessToken} = require("../utils/generateAccessToken")
const {generateRefreshToken} = require("../utils/generateRefreshToken")
const {validateRefreshToken} = require("../middleware/validateRefreshToken")
const bcrypt = require("bcrypt");

const User = require("../models/User");

const registerUser = async ({ name, email, password }) =>{

    
    const existingUser=await User.findOne({email})
    if(existingUser){
        throw new Error("User already exists");
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const user= new User({name,email,password:hashedPassword})

    await user.save();
    return user;

}


const loginUser=async({email,password})=>{
    const user=await User.findOne({email}).select("+password")
    if(!user){
        throw new Error("User does not exist");
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            throw new Error("Invalid credentials");
        }
        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)
        user.refreshToken = refreshToken;
        await user.save();
            user.password = undefined;
            return { user, accessToken,refreshToken };
}

// validate refresh token
const refreshToken = async(refreshtoken)=>{
      const decoded = validateRefreshToken(refreshtoken);
      const user = await User.findById(decoded.userId);
     
    if(!user){
        throw new Error("user is not found")
    }
     if(user.refreshToken!==refreshtoken){
        throw new Error(" the refresh toke is invalid or expire");
        
     }
        const newRefreshToken=generateRefreshToken(user._id)
        user.refreshToken=newRefreshToken;
        await user.save()
         const accessToken = generateAccessToken(user._id)
        return {
            refreshToken:newRefreshToken,
            accessToken
        }
      
}
const logoutUser= async(refreshToken) => {
    const user = await User.findOne({refreshToken});
    if (!user) {
       const error = new Error("User not found");
       error.statusCode = 404;
       throw error;
    }
    user.refreshToken=null;
    await user.save()
}
module.exports={registerUser,loginUser,refreshToken,logoutUser};
