const express = require("express");
const router=express.Router();
const {validateRegister} = require("../middleware/validateRegister.js");
const {validateLogin} = require("../middleware/validateLogin.js");
const {validateResetToken} = require("../middleware/validateResetToken.js");
const{protect}=require("../middleware/protect.js");
const {registerUser,loginUser,getProfile,refreshToken,logoutUser,forgotPassword,validateOtp,resetPassword} = require("../controllers/authController");
const { validateResetPassword } = require("../middleware/validateResetpassword.js");

router.post(
   "/signup",
   validateRegister,
   registerUser
);
router.post(
    "/login",
    validateLogin,
   loginUser
)
router.get(
   "/protected",
   protect,
   (req,res)=>{
      res.json(req.user);
   }
)
router.get(
   "/profile",
   protect,
   getProfile
)
router.get(
   "/refresh",
   refreshToken
)
router.post(
    "/logout",
    logoutUser

)
router.post(
    "/forgot-password",
     
    forgotPassword
);

router.post(
   "/validateOtp",
   validateOtp
);

router.post(
   "/reset-password",
   validateResetToken,
   validateResetPassword,

   resetPassword
)
module.exports = router;