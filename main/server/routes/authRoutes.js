const express = require("express");
const router=express.Router();
const {validateRegister} = require("../middleware/validateRegister.js");
const {validateLogin} = require("../middleware/validateLogin.js");
const{protect}=require("../middleware/protect.js");

const {registerUser,loginUser,getProfile,refreshToken,logoutUser} = require("../controllers/authController");

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
module.exports = router;