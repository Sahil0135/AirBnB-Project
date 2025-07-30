const mongoose =require("mongoose");
const List = require("./listSchema");

const userSchema=new mongoose.Schema({
   name:{
    type :String,
    required:true,
      trim: true    
   } ,
     email:{
    type :String,
    required:true,
      trim: true    
   } ,
    password:{
    type :String,
    required:true,
      trim: true    
   } , 
   listing:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"List" 
}],
     booking:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"List"
   }]
   
},{timestamps:true})

const User=mongoose.model("User",userSchema)


module.exports=User;