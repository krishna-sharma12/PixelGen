const express=require("express");
const app=express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();



app.get("/",(req,res)=>{
    res.send(" server is running fine ");
})


const port=5000;

app.listen(port,() => {
    console.log(`server is running  at ${port}`);
})
