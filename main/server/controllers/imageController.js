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
const deleteImage = async(req,res)=>{
    try{
        const imageid=req.params.id;
        const userid=req.user._id;
        const result=await  imageService.deleteImage(imageid,userid);
      if (result.deletedCount === 1) {
        res.json({ success: true, message: "Image deleted successfully" });
    // success
      } else {
        res.status(404).json({ success: false, message: "Image not found or doesn't belong to this user" });
    // image not found or doesn't belong to this user
    }
    }catch(err){
        res.status(500).json({success:false,message:"Failed to delete image"});
    }
}
module.exports={imageGenerator,getUserImagesHistory,deleteImage};