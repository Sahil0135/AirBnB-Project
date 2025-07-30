const cloudinary = require('cloudinary').v2;
const fs=require("fs")


async function uploadCloudinary(filepath) {
    


    // Configuration
    cloudinary.config({ 
        cloud_name:  process.env.CLOUD_name, 
        api_key:process.env.API_key , 
       api_secret:  process.env.API_secret// Click 'View API Keys' above to copy your API secret
    });

    try{
   if(!filepath){
    return null
 }
    
    // Upload an image
     const uploadResult = await cloudinary.uploader.upload(filepath)

        if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }


       return uploadResult.secure_url
}

       catch(error) {
              if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    console.log("Cloudinary upload error:", error);
    return null;
       };
    


}

module.exports= uploadCloudinary;