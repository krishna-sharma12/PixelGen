const generateAccessToken = require("../utils/generateAccessToken");
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
        const accessToken=generateAccessToken(user._id)
            user.password = undefined;
            return { user, accessToken };
}
module.exports={registerUser,loginUser};