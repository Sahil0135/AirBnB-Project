
const express = require("express");
const {signup,login,logout}=require("../Controller/authcontroller");
const isAuth = require("../middleware/isAuth");
const getUser = require("../Controller/usercontroller");
const upload = require("../middleware/multer");
const {getImage,getListing,findListing, updateListing, deleteListing} = require("../Controller/listingcontroller");
const { booking, cancelBooking } = require("../Controller/bookingcontroller");





const Router=express.Router();

Router.post('/signup',signup)
Router.post('/login',login)
Router.post('/logout',logout)
Router.get('/getUser',isAuth,getUser)
Router.post('/listing/add',isAuth,upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1}
]),getImage)

Router.get('/getListing',getListing)

Router.get('/findListing/:id',isAuth,findListing)

Router.delete('/deleteListing/:id',isAuth,deleteListing)
Router.delete('/cancelBooking/:id',isAuth,cancelBooking)

Router.post('/booking/:id',isAuth, booking)



Router.post('/listing/updateListing/:id',isAuth,upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1}
]),updateListing)


Router.get('/log',(req,res)=>{
    console.log("bhjghhj");
    
    res.send('chl rha hai')
    
})
console.log('gg');

Router.get('/',(req,res)=>{
    res.send("eddcs")
})







module.exports=Router;