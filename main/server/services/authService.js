const {generateAccessToken} = require("../utils/generateAccessToken")
const {generateRefreshToken} = require("../utils/generateRefreshToken")
const {validateRefreshToken} = require("../middleware/validateRefreshToken")
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../models/User");


// register user

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

// login user 

const loginUser=async({email,password})=>{
    const user=await User.findOne({email}).select("+password")
    if(!user){
        const error = new Error("Invalid email or password ");
        error.statusCode = 401;
        throw error;
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

// logout user

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

// forgot password

const forgotPassword = async(email) =>{
    const user = await User.findOne({email})
    if(!user){
       const error = new Error("Invalid email");
       error.statusCode = 404;
       throw error;
    }

    const otp = crypto.randomInt(100000,1000000);
    user.resetOtp=otp.toString();
    user.expireResetOtp=Date.now()+ 10*60*1000;
    await user.save();
    await sendEmail( 
        user.email,
        "Password Reset OTP",
        `Your OTP is ${otp}. It is valid for 10 minutes.`);
        
    
}
module.exports={registerUser,loginUser,refreshToken,logoutUser};
