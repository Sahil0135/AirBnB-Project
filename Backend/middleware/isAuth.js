const jwt  = require("jsonwebtoken");

const isAuth=async (req,res,next) => {
    try{
let {token}=req.cookies;
if(!token){
  return   res.status(400).json({message:"user doesnot token"})
}

let verify=jwt.verify(token,process.env.JWT_SECRET)
if(!verify){
   return  res.status(400).json({message:"user  not valid"})
}
console.log("verify",verify);
console.log("req",req);


req.userId=verify.userId
next();

    }
    catch(e){
        return res.status(400).json({message:"isAuth error"})
    }
    
}

module.exports=isAuth;