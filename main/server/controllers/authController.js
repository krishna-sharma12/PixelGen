const authService=require('../services/authService');
const asyncHandler = require("express-async-handler");

// register user

const registerUser=asyncHandler(async(req,res)=>{

        const{name,email,password}=req.body;
        const result=await(authService.registerUser({name,email,password}));
        res.status(201).json({message:"User registered successfully", user: result});
})

// loginUser controller
const loginUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;

        const result=await authService.loginUser({email,password});
        res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
});
        res.status(200).json({message:"User logged in successfully", user: result});
})

// get profile 

const getProfile = asyncHandler(async(req,res) => {
        const result =req.user
        result.password=undefined
       
        res.json({message:"success",user:result})
        

    
})


// refresh controller 

const refreshToken = asyncHandler(async(req,res)=>{
    const refreshtoken=req.cookies.refreshToken;
    
    const result = await authService.refreshToken(refreshtoken);
    res.status(200).json({message:"Access token refresh successfully", user: result});

})

// logout user

const logoutUser   = asyncHandler(async(req,res) =>{

      const refreshToken = req.cookies.refreshToken;

    await authService.logoutUser(refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json({message:"the user is logout successfully"})
})

// forgot password

const forgotPassword = asyncHandler(async(req,res) => {
    const {email} =req.body;
     await authService.forgotPassword(email);
    
        res.status(200).json({success:true,message:"otp is send to the email"})

})

const validateOtp = asyncHandler(async(req,res) =>{
    const {email,resetOtp} = req.body;
    const resetToken = await authService.validateOtp(email,resetOtp);
    res.status(200).json({success:true,message:"otp is verified successfully",resetToken})
})



// resetPassword

const resetPassword = asyncHandler(async (req, res) => {

    const { newPassword } = req.body;

    await authService.resetPassword(
        req.user.id,
        newPassword
    );

    res.status(200).json({
        success: true,
        message: "Password reset successfully"
    });

});


module.exports={registerUser, loginUser,getProfile,refreshToken,logoutUser,forgotPassword,validateOtp,resetPassword};