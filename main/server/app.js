const express=require("express");
const app=express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const generateImage = require("./services/imageService");

// cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());


// cors 

const cors = require("cors");
app.use(cors());

dotenv.config();
console.log("EMAIL:", process.env.EMAIL);
console.log("EMAIL_PASSWORD:", process.env.EMAIL_PASSWORD);

//mongodb connnection
connectDB();

// parsing the data
app.use(express.urlencoded({extended:true}));
app.use(express.json());




app.use("/api/auth", require("./routes/authRoutes"));


// api image prompt
app.use("/api/image",require("./routes/imageRoutes"));








app.get("/",(req,res)=>{
    res.send(" server is running fine ");
})



const {errorMiddleware} = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

const port=5000;

app.listen(port,() => {
    console.log(`server is running  at ${port}`);
})
