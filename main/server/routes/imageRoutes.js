const express=require("express");
const router=express.Router();
const {protect}=require("../middleware/protect.js");
const {imageGenerator,getUserImagesHistory,deleteImage}=require("../controllers/imageController.js");
router.post(
    "/generate",
    protect,
    imageGenerator

);
router.get(
    "/history",
    protect,
    getUserImagesHistory,
)
router.delete(
    "/:id",
    protect,
    deleteImage
)
module.exports=router;