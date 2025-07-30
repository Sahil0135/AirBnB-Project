const Booking = require("../Modal/bookingSchema");
const List = require("../Modal/listSchema");
const User = require("../Modal/userSchema");

async function booking(req, res) {
  try {
    
    
    let {id}=req.params
    console.log("booking list",id);
    let{checkIn,checkOut,totalRent}=req.body
    let listing=await List.findById(id);

   if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

     if (new Date(checkIn)>=new Date(checkOut)) {
      return res.status(404).json({ message: "Invalid checkIn/checkOut" });
    }
    

     if (listing.isBooked) {
      return res.status(404).json({ message: "Listing is already booked" });
    }


          const booking = await Booking.create({
          host:listing.host,
          guest:req.userId,
          listing:listing._id,
      
          checkIn,
          checkOut,
          totalRent,
        
        });

      await booking.populate("host","email")  
    const user = await User.findByIdAndUpdate(req.userId,{
        $push:{booking:listing._id}
    },{new:true})

 if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    listing.isBooked=true;

    listing.guest=req.userId
    await listing.save();
    

   
    return res.status(201).json({ message: "Booking Create Succesfull", booking });
  } catch (e) {
    return res.status(500).json({ message: "Booking error", error: e.message });
  }
}



async function cancelBooking(req, res) {
  try {
    let {id}=req.params

    
    console.log("booking er",id);
  console.log("gi");
  
            const  listing= await List.findByIdAndUpdate(id,{isBooked:false})

  
        const  user= await User.findByIdAndUpdate(listing.guest,{$pull:{booking:listing._id}},{new:true})

   
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(201).json({ message: "Booking Cancel Successfull",});
  } catch (e) {
    return res.status(500).json({ message: "Cancel Boooking error", error: e.message });
  }
}


module.exports={booking,cancelBooking};