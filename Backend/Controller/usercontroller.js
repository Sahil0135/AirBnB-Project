const User = require("../Modal/userSchema");

async function getUser(req, res) {
  try {
    console.log("userID getuser",req.userId);
    
    const user = await User.findById(req.userId).select("-password").populate
    ("listing","title image1 image2 image2 description rent category city landMark isBooked host ratings")
    .populate("booking","title image1 image2 image2 description rent category city landMark isBooked host ratings")

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json({ message: "getUser error", error: e.message });
  }
}

module.exports=getUser;