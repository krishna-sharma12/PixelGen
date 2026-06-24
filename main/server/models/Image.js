const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    prompt:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    

},
{
    timestamps: true
});
module.exports = mongoose.model("Image", imageSchema);