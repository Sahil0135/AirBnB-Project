const mongoose =require("mongoose");


const listSchema=new mongoose.Schema({
   title:{
    type :String,
    required:true,
   } ,
     description:{
    type :String,
    required:true,
   } ,
    rent:{
    type:Number,
    required:true,
   } , 
   host:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
},
   guest:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
},
  image1:{
      type :String,
    required:false,
  },
   image2:{
      type :String,
    required:false,
  },
   image3:{
      type :String,
    required:false
  },
  city:{
      type :String,
    required:true,
  },
  landMark:{
     type :String,
    required:true,
  },
  category:{
     type :String,
    required:true,
  },
  isBooked:{
     type :Boolean,
    default:false,
  },
  //  ratings:{
  //    type :Number,
  //    min:0,
  //    max:5,
  //   default:0,
  // }
     
   
},{timestamps:true})

const List=mongoose.model("List",listSchema)

module.exports= List;