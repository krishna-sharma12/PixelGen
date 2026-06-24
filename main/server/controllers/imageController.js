const imageService = require("../services/imageService");

const imageGenerator = async (req, res) => {

    try{
        const { prompt } = req.body;
        const userid = req.user._id; 
        const image = await imageService.generateImage(prompt, userid);
        res.json({ success: true, image });
    }catch(err){
        res.status(500).json({ success: false, message: "Image generation failed" });
    }
}
const getUserImagesHistory = async (req,res)=>{
    try{
        const userid = req.user._id;
        const images= await imageService.getUserImagesHistory(userid);
        res.json({success:true,images}
        )
    }
    catch(err){
        res.status(500).json({success:false,message:"Failed to fetch user image history"});
    }
}
module.exports={imageGenerator,getUserImagesHistory};