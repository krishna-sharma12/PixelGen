const express = require("express");
const router=express.Router();
const {validateRegister} = require("../middleware/validateRegister.js");
const {validateLogin} = require("../middleware/validateLogin.js");
// const {validateLogin} = require("../middleware/validateLogin");
const {registerUser} = require("../controllers/authController");
const{LoginUser}=require("../controllers/authController")

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
// router.post(
//     "/logout",
//     logoutUser

// )
module.exports = router;