const express=require("express");
const app=express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const generateImage = require("./services/imageservice");



app.use(express.json());
const cors = require("cors");

app.use(cors());

dotenv.config();

connectDB();



app.get("/",(req,res)=>{
    res.send(" server is running fine ");
})

// app.get("/test", (req, res) => {
//   res.json({
//     success: true,
//     message: "Backend working"
//   });
// });


// app.post("/api/image/generate", (req, res) => {
//   console.log("REQUEST RECEIVED");
//   console.log(req.body);

//   res.json({
//     success: true
//   });
// });

// api image prompt
app.post("/api/image/generate", async (req, res) => {
  console.log("REQUEST RECEIVED FROM FRONTEND");

  try {
    const { prompt } = req.body;

    const image = await generateImage(prompt);

    res.json({
      success: true,
      image,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Image generation failed",
    });
  }
});


const port=5000;

app.listen(port,() => {
    console.log(`server is running  at ${port}`);
})
