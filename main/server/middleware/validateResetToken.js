const jwt = require("jsonwebtoken");
const validateResetToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const error = new Error(" token is not valid ");
        error.statusCode= 400;
        throw error
    }
    const token = authHeader.split(" ")[1];
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    if (decoded.type !== "reset") {
        const error = new Error("token is not valid");
        error.statusCode = 400;
        throw error
    }
 
    req.user=decoded;
    next();
    

}
module.exports={validateResetToken}