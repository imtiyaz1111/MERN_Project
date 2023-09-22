const express=require("express")
const jwt=require("jsonwebtoken")
const router=express.Router()
const bcrypt=require("bcryptjs")
const authenticate=require("../middleware/authenticate")
require("../config/db")
const User=require("../model/userSchema")
const Contact=require("../model/contactSchema")


//register
router.post("/register", async(req,res)=>{
  const {name,email,phone,work,password,cpassword}=req.body;
  if(!name || !email || !phone || !work || !password || !cpassword)
  {
    return res.status(422).json({error:"Please fill the all box"})
  }
  try {
   const userExist=await User.findOne({email:email})
   if(userExist)
      {
          return res.status(422).json({error:"Email already Exist"})
      }
      else if(password != cpassword)
      {
        return res.status(422).json({error:"Password  is not match"})
      }
      else
      {
        const user=new User({name,email,phone,work,password,cpassword});
        // here is hashing
        const userResgister=await user.save()
        if(userResgister)
        {
          res.status(202).json({message:"user register successfully"}) 
        }
        else
        {
          res.status(500).json({error:"Faild Register"}) 
        }
      }
     
  } catch (error) {
    console.log(error);
  }
})
// login
router.post("/login", async(req,res)=>{
  try {
     const {email,password}=req.body;
     if(!email || !password)
     {
       return res.status(400).json({error:"Please filled the data"})
     }
     const userLogin=await User.findOne({email:email})
     if(userLogin)
     {
      const isMatch=await bcrypt.compare(password,userLogin.password)
      const token=await userLogin.generateAuthToken();
      res.cookie("jwtoken",token,{
        expires:new Date(Date.now()+25892000000),
        httpOnly:true
      })
      console.log(token)

      if(!isMatch)
      {
        return res.status(400).json({error:"failed to login"})
      }
      else{
       return res.status(202).json({message:"login successfully"})
      }
     }
     else
     {
      return res.status(400).json({error:"failed to login"})
     }
    
  } catch (error) {
    console.log(error);
  }
})

//about
router.get("/about",authenticate,(req,res)=>{
  res.send(req.rootUser)
})


//home
router.get("/getdata",authenticate,(req,res)=>{
  res.send(req.rootUser)
})

//contact
router.post("/contact", async(req,res)=>{
 try {
  const {name,email,phone,message}=req.body;
  if(!name || !email || !phone || !message)
  {
    return res.json({error:"Please fill the all box"})
  }
  else
  {
    const contact=new Contact({name,email,phone,message});
    const userContact=await contact.save()
    if(!userContact)
    {
      return res.json({error:"Message send failed"})
    }
    else{
      res.json({message:"Message send successfully"}) 
    }
  }
 } catch (error) {
  console.log(error);
 }
})

//logout
router.get("/logout",(req,res)=>{
  res.clearCookie('jwtoken',{path:'/'})
  res.status(200).send("user logout")
})


module.exports=router