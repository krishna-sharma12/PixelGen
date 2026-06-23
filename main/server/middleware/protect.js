const jwt=require("jsonwebtoken");
const User = require("../models/User");
const protect=async(req,res,next)=>{
let token = req.headers.authorization;
if(!token)
  {
    throw new Error("No token provided");
  }
  const decode=jwt.verify(token,process.env.JWT_SECRET);
  const user=await User.findById(decode.userId)
  req.user=user;
  next();
}
module.exports={protect};