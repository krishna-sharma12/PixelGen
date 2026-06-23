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
    const userexisting=await User.findOne({email})
    if(!userexisting){
        throw new Error("User does not exist");
    }
    const isPasswordMatch=await bcrypt.compare(password,userexisting.password)
        if(!isPasswordMatch){
            throw new Error("Invalid credentials");
        }
            return userexisting;
}
module.exports={registerUser,loginUser};