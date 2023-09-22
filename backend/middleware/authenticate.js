const jwt =require("jsonwebtoken")
const User=require("../model/userSchema")

const authenticate = async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        const verifyToken=jwt.verify(token,process.env.SECRETKEY)
        const rootUser=await User.findOne({_id: verifyToken._id,"tokens.token":token})
        
        if(!rootUser){
            throw new Error('user not found')
        }

        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;
        next();
    } catch (error) {
        res.status(401).send("Unauthorized:No token provide")
        console.log(error)
    }
}

module.exports=authenticate;