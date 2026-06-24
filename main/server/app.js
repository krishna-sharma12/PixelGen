const express=require("express");
const app=express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const generateImage = require("./services/imageService");

const cors = require("cors");

app.use(cors());

dotenv.config();

//mongodb connnection
connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use("/api/auth", require("./routes/authRoutes"));


// api image prompt
app.use("/api/image",require("./routes/imageRoutes"));








app.get("/",(req,res)=>{
    res.send(" server is running fine ");
})





const port=5000;

app.listen(port,() => {
    console.log(`server is running  at ${port}`);
})
