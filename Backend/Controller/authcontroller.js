const genToken = require("./token");
const bcrypt = require("bcrypt");
const User = require("../Modal/userSchema");


// const cookie=require("cookie-parser");

const signup= async(req,res)=>{
   try{
    console.log("kyon nhi horaha");
    
    const {name,email,password}=req.body

      if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
   let exist=await User.findOne({email})
   console.log("first");
   
    if(exist){
        return res.status(400).json({message:"User is already exist"}) 
    }
    // console.log("second");
    
   
        let hashpassword=await bcrypt.hash(password,10)
     let user= await User.create({name,email,password:hashpassword});
     let token=await genToken(user._id)
     console.log(process.env.JWT_SECRET);
          console.log(process.env.NODE_ENV);
console.log("Generated token:", token);
     
     res.cookie("token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV =='production',
        sameSite:'strict',
        maxAge:7*24*60*60*1000
     }
     )
     
     
     console.log("cookie");
     
    
    return res.status(201).json({
      message: "User created successfully",
      user
      : {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
}
catch(e){
    return res.status(500).json({message:"Signup error",e})
}

}
const login= async(req,res)=>{
  try{
  let {email,password}=req.body;
     let user=await User.findOne({email}).populate("listing","title image1 image2 image2 description rent category city landMark");
     if(!user){
      return res.status(400).json({ message: "User not found. Please sign up." })
     }
     let check=await bcrypt.compare(password,user.password);

     if(!check){
            return res.status(400).json("incorretc password")

     }

  
     let token=await genToken(user._id)

console.log("Generated token:", token);
     
     res.cookie("token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV ==='production',
        sameSite:'strict',
        maxAge:7*24*60*60*1000
     }
     )
    
    return res.status(201).json({
      message: "User created successfully",
      user
    })
}
catch(e){
    return res.status(500).json({message:"login error",e})
}
}

const logout=async (req,res)=>{
  try{
    res.clearCookie("token")
    console.log("logut");
    
        return res.status(201).json({message:"logout succesful"})

  }
  catch(e){
        return res.status(500).json({message:"logout error",e})



  }

}

module.exports={signup,login,logout};