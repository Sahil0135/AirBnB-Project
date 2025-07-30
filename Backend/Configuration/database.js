const mongoose =require("mongoose");


async function connect() {
    try{
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
   console.log("Database connected successfully");
    }
    catch(e){
  console.log("database error",e);
  
    }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports=connect;