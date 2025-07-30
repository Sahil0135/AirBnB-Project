const uploadCloudinary = require("../Configuration/cloudinary");
const List = require("../Modal/listSchema");
const User = require("../Modal/userSchema");

async function getImage(req, res) {
  try {
    const host= req.userId;
    const{title,description,rent,landMark,category,city}=req.body

    if (
      !req.files?.image1 ||
      !req.files?.image2 ||
      !req.files?.image3
    ) {
      return res.status(400).json({
        message: "All 3 images (image1, image2, image3) are required.",
      });
    }

    // ✅ Optional: Log uploaded files for debugging
    console.log("Uploaded files:", req.files);
    console.log(req.files);
    

    const image1 = await uploadCloudinary(req.files.image1[0].path);
    const image2 = await uploadCloudinary(req.files.image2[0].path);
    const image3 = await uploadCloudinary(req.files.image3[0].path);


      const list = await List.create({
      host,
      title,
      description,
      rent,
      landMark,
      city,
      category,
      image1, 
      image2, 
      image3
    });
     let user=await User.findByIdAndUpdate(host,{$push:{listing:list._id}},{new:true})
    if(!user){
         return res.status(404).json({message:"user is not found"});
    }

    return res.status(201).json(list);
   
  } catch (e) {

    
    return res.status(500).json({ message: "getImage error", error: e.message });
  }
}


async function getListing(req,res) {
  try{
    console.log("-----------------------------------------------------------------------------------");
    
    let listing=await List.find().sort({createdAt:-1})

    // console.log("listing",listing);
    
   return res.status(201).json(listing)
  }catch(e){
        res.status(500).json({message:`getting Listing error`,error:e.message})

  }
}



async function findListing(req, res) {
  try {
    let {id}=req.params

    
    console.log("userID find listing",id);
  console.log("gi");
  
    
    const listing = await List.findById(id);
    console.log(listing);
    

    if (!listing) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(201).json(listing);
  } catch (e) {
    return res.status(500).json({ message: "findListing error", error: e.message });
  }
}


async function updateListing(req, res) {
  try {
    let {id}=req.params
        const{title,description,rent,landMark,category,city}=req.body

    
    console.log("userID er",id);

    const image1 = await uploadCloudinary(req.files.image1[0].path);
    const image2 = await uploadCloudinary(req.files.image2[0].path);
    const image3 = await uploadCloudinary(req.files.image3[0].path);


      const list = await List.findByIdAndUpdate(id,{
    
      title,
      description,
      rent,
      landMark,
      city,
      category,
      image1, 
      image2, 
      image3
    },{new:true});
  

    return res.status(201).json(list);
   
  } catch (e) {
    return res.status(500).json({ message: "updateImage error", error: e.message });
  }
}


async function getListing(req,res) {
  try{
    console.log("-----------------------------------------------------------------------------------");
    
    let listing=await List.find().sort({createdAt:-1})

    // console.log("listing",listing);
    
   return res.status(201).json(listing)
  }catch(e){
        res.status(500).json({message:`getting Listing error`,error:e.message})

  }
}





async function deleteListing(req, res) {
  try {
    let {id}=req.params

    
    console.log("userID er",id);
  console.log("gi");
  
    
    const listing = await List.findByIdAndDelete(id);
        const  user= await User.findByIdAndUpdate(listing.host,{$pull:{listing:listing._id}},{new:true})

   
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(201).json({ message: "Listing Delete Successful", listing ,user});
  } catch (e) {
    return res.status(500).json({ message: "DeletingListing error", error: e.message });
  }
}



module.exports={getImage,getListing,findListing,updateListing,deleteListing};