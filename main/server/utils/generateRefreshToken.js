const jwt =require("jsonwebtoken");


const generateRefreshToken = (userId)=>{
       const token=jwt.sign(
        {
            userId
        },
        process.env.JWT_REFRESH_SECRET,

        {
            expiresIn:"7d"

        })
        return token
    


}
module.exports={generateRefreshToken}