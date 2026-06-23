const authService=require('../services/authService');

const registerUser=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const result=await(authService.registerUser({name,email,password}));
        res.status(201).json({message:"User registered successfully", user: result});
    } catch (error) {
        res.status(500).json({message:"Error registering user", error: error.message});
    }
}
module.exports={registerUser};

// loginUser controller
const loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const result=await authService.LoginUser({email,password});
        res.status(200).json({message:"User logged in successfully", user: result});
    } catch (error) {
        res.status(500).json({message:"Error logging in user", error: error.message});
    }
}
module.exports={registerUser, loginUser};