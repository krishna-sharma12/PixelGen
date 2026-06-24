const jwt=require("jsonwebtoken");
const User = require("../models/User");

  const protect=async(req,res,next)=>{
  try{
    let token = req.headers.authorization;
    if(!token){
     throw new Error("No token provided");
    }
    token=token.split(" ")[1];
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    const user=await User.findById(decode.userId)
    if(!user){
     throw new Error("User not found");
    }
    req.user=user;
    next();
  }
  catch(err){
  throw new Error("Not authorized");
}
}


module.exports={protect};