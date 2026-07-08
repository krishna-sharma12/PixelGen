const Joi = require("joi");

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});










const validateRegister=(req,res,next)=>{

    const result = registerSchema.validate(req.body);
    if(result.error){
        return  res.status(400).json(
            {
                success:false,
                message:result.error.message
            }
        )
    }
    // const validateRegister=req.body;
    // if(!name || !password || !email){
    //     return res.status(400).json({message:"All fields are required"});
    // }
    // if(password.length<8){
    //     return res.status(400).json({message:"password must be at least 8 characters"})

    // }
    next();
    
}
module.exports={validateRegister};