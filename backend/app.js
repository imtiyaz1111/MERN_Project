require('dotenv').config();
const express=require("express");
const connectToDb=require("./config/db")
const app=express()
const cors=require("cors")
const PORT=process.env.PORT || 7000


app.use(cors())
app.use(express.json())
app.use(require("./router/auth"))

connectToDb();


app.listen(PORT,()=>{
    console.log(`port no listening on ${PORT}`)
})