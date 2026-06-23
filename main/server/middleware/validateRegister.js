const validateRegister=(req,res,next)=>{
    const{name,password,email}=req.body;
    if(!name || !password || !email){
        return res.status(400).json({message:"All fields are required"});
    }
    if(password.length<8){
        return res.status(400).json({message:"password must be at least 8 characters"})

    }
    next();
    
}
module.exports={validateRegister};