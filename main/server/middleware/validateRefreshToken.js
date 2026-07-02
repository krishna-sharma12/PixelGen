const jwt = require("jsonwebtoken")
const validateRefreshToken=(refreshtoken)=>{
    const decoded = jwt.verify(refreshtoken,process.env.JWT_REFRESH_SECRET)
    return decoded

}
module.exports={validateRefreshToken}