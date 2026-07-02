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

// loginUser controller
const loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const result=await authService.loginUser({email,password});
        res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
});
        res.status(200).json({message:"User logged in successfully", user: result});
    } catch (error) {
        res.status(500).json({message:"Error logging in user", error: error.message});
    }
}

// get profile 

const getProfile = async(req,res) => {
    try{
        const result =req.user
        result.password=undefined
       
        res.json({message:"success",user:result})
    }
        

    catch(error){

        res.status(500).json({
          message: "Failed to fetch profile",
          error: error.message
        });
    }
    
}


// refresh controller 

const refreshToken = async(req,res)=>{
    const refreshtoken=req.cookies.refreshToken;
    try{
        const result = await authService.refreshToken(refreshtoken);
    res.status(200).json({message:"User logged in successfully", user: result});

    }catch(error){
        res.status(500).json({message:"Error logging in user", error: error.message});

    }
    
  

}


const logoutUser   = async(req,res) =>{
    res.clearCookie("refreshToken");
    res.status(200).json({message:"the user is logout successfully"})
}
module.exports={registerUser, loginUser,getProfile,refreshToken,logoutUser};