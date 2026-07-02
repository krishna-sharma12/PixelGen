const jwt=require("jsonwebtoken");
const generateAccessToken = (userId) => {
    const token = jwt.sign
    ({
        userId
    },
    
    process.env.JWT_SECRET,
    {
        expiresIn:"15m"
    })
    return token;
}
module.exports={generateAccessToken};