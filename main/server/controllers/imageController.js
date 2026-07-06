const imageService = require("../services/imageService");
const asyncHandler = require("express-async-handler");

const imageGenerator = asyncHandler(async (req, res) => {

        const { prompt } = req.body;
        const userid = req.user._id; 
        const image = await imageService.generateImage(prompt, userid);
        res.json({ success: true, image });
})

// image history
const getUserImagesHistory = asyncHandler(async (req,res)=>{
        const userid = req.user._id;
        const images= await imageService.getUserImagesHistory(userid);
        res.json({success:true,images}
        )

})

// delete Image
const deleteImage = asyncHandler(async(req,res)=>{

        const imageid=req.params.id;
        const userid=req.user._id;
        const result=await  imageService.deleteImage(imageid,userid);
      if (result.deletedCount === 0) {
         const error = new Error("Image not found")
         error.statusCode(error)
         throw error;
        }  
})
module.exports={imageGenerator,getUserImagesHistory,deleteImage};