const express=require("express");
const app=express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const generateImage = require("./services/imageservice");

const cors = require("cors");

app.use(cors());

dotenv.config();

//mongodb connnection
connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));









app.get("/",(req,res)=>{
    res.send(" server is running fine ");
})


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
