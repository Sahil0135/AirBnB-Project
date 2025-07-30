
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataProvider';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../CSS/ViewCard.css';

function ViewCard(props) {
  const {
    card, userData, serverurl,
    checkIn, setCheckIn,
    checkOut, setCheckOut,
    total, setTotal, night, setNight, handleBooking,
  updating,setUpdating,deleting,setDeleting} = useContext(DataContext);
    // if (!card || !userData) return <h1>Loading...</h1>;

  const [title, setTitle] = useState(card?.title || "");
  const [description, setDescription] = useState(card?.description || "");
  const [rent, setRent] = useState(card?.rent || 0);
  const [city, setCity] = useState(card?.city || "");
  const [landMark, setLandMark] = useState(card?.landMark || "");
  const [category, setCategory] = useState(card?.category || "");

  const [update, setUpdate] = useState(false);
  const [bookPop, setBookPop] = useState(false);

  const [backImage1, setBackImage1] = useState(null);
  const [backImage2, setBackImage2] = useState(null);
  const [backImage3, setBackImage3] = useState(null);
  const [minDate, setMinDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
  }, []);

  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const n = (outDate - inDate) / (24 * 60 * 60 * 1000);
      setNight(n);
      var charge = card.rent * 0.07;
      setTotal(n > 0 ? (card.rent * n + charge*2) : 0);
    }
  
    
  }, [checkIn, checkOut, card.rent]);
  console.log("total",total);
  

  const handleImageChange = (setImageFn) => (e) => {
    const file = e.target.files[0];
    setImageFn(file);
  };

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    setDeleting(true)
    try {
      const result = await axios.delete(`${serverurl}/auth/DeleteListing/${card._id}`, { withCredentials: true });
        setDeleting(false)
      toast.success(result.data.message);
      navigate("/");
    } catch (e) {
       setDeleting(false)
      toast.error(e.response?.data?.message || "Failed to delete.");
    }
  }

  async function handleClick() {
    setUpdating(true)
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landMark", landMark);
      if (backImage1) formData.append("image1", backImage1);
      if (backImage2) formData.append("image2", backImage2);
      if (backImage3) formData.append("image3", backImage3);

      const result = await axios.post(`${serverurl}/auth/listing/updateListing/${card._id}`, formData, {
        withCredentials: true
      });
      setUpdating(false)

      toast.success("Update Successful");
      navigate('/');

    } catch (e) {
       setUpdating(false)
      toast.error(e.response?.data?.message || "Failed to update.");
    }
  }


  return (
    <div className="viewcard-container">
      <div className={`viewcard-main ${update ? 'blurred' : ''}`}>
        <h3 className="back-btn" onClick={() => navigate("/")}>Back</h3>

        <div className="title-box">
          <h1>View Card</h1>
        </div>

        <div className="card-detail-box">
          <div className="images">
            <img src={card.image1} alt="img1" />
            <img src={card.image2} alt="img2" />
            <img src={card.image3} alt="img3" />
          </div>

          <div><h3>{`${card.title.toUpperCase()}, ${card.category.toUpperCase()}, ${card.landMark.toUpperCase()}`}</h3></div>
          <div><h3>{card.description.toUpperCase()}</h3></div>
          <div><h3>Rs. {card.rent}</h3></div>

          {userData._id === card.host
            ? <button   onClick={() => setUpdate(prev => !prev)}>Edit</button>
            : <button onClick={() => setBookPop(prev => !prev)}>Book</button>
          }
        </div>
      </div>

      {update && (
        <div className="modal-overlay1">
          <h3 className="back-btn" onClick={() => setUpdate(false)}>Back</h3>
          <h1>Editing Form Section</h1>
          <form className="form-box" onSubmit={(e) => { e.preventDefault(); handleClick(); }}>
            <label>Title</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Description</label>
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

            <label>Image1</label>
            <input type="file" onChange={handleImageChange(setBackImage1)} required />

            <label>Image2</label>
            <input type="file" onChange={handleImageChange(setBackImage2)} required />

            <label>Image3</label>
            <input type="file" onChange={handleImageChange(setBackImage3)} required />

            <label>Rent</label>
            <input type="number" required value={rent} onChange={(e) => setRent(e.target.value)} />

            <label>City</label>
            <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} />

            <label>LandMark</label>
            <input type="text" required value={landMark} onChange={(e) => setLandMark(e.target.value)} />
     <div style={{display:"flex",justifyContent:"space-between"}}>
            <button type="submit" disabled={updating}>{updating?"Updating..":"Update Listing"}</button>
            <button type="button" onClick={handleDelete} disabled={deleting}>{deleting?"Deleting..":"DELETE"}</button>
         </div>
          </form>
        </div>
      )}

      {/* Booking Modal can also be moved to a separate component for better readability */}
    {bookPop && (
  <div className="modal-overlay">
    
    <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
      <h3  onClick={() => setBookPop(false)}>Back</h3>
      <h2 style={{borderBottom:"2px solid aliceblue", width:"60%",textAlign:"center" }}>Confirm & Book</h2>
      <hr />
      <div>YOUR TRIP-</div>
      <div>
        <label>CheckIN</label>&nbsp;
        <input type="date" min={minDate} required onChange={(e) => setCheckIn(e.target.value)} value={checkIn} />
      </div>
      <div>
        <label>CheckOut</label>&nbsp;
        <input type="date" min={minDate} required onChange={(e) => setCheckOut(e.target.value)} value={checkOut} />
      </div>
      <div>
        <button onClick={() => handleBooking(card._id)}>Book Now</button>
      </div>
    </form>
    

    <div className="booking-summary">
      <div className="summary-header">
        <img src={card.image1} alt="" />
        <div className="summary-header-content">
          <h3>{`${title.toUpperCase()}, ${category.toUpperCase()}, ${landMark.toUpperCase()}`}</h3>
          <h3>{`${description.toUpperCase()}`}</h3>
        </div>
      </div>
      <div className="summary-pricing">
        <h4>Booking Price-</h4>
        <p><span>Rs.{card.rent} X {night} nights</span><span>{card.rent * night}</span></p>
        <p><span>Airbnb Charge</span><span>{card.rent * 7 / 100}</span></p>
        <p><span>Tax</span><span>{card.rent * 7 / 100}</span></p>
        <hr />
        <p><span>Total</span><span>{total==0?2*card.rent * 7 / 100:total}</span></p>
      </div>
    </div>
  </div>

)}
</div>
)}
 export default ViewCard;
















{/* 

// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { DataContext } from '../Context/DataProvider';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// function ViewCard(props) {

//        let {card,userData,serverurl,checkIn, setCheckIn,
// checkOut, setCheckOut,
// total, setTotal,night, setNight,handleBooking}=useContext(DataContext)
// if (!card || !userData) {
//   return <h1>Loading...</h1>;
// }
//       const [title, setTitle] = useState(card.title);
//       const [description, setDescription] = useState(card.description);
//       const [rent, setRent] = useState(card.rent);
//       const [city, setCity] = useState(card.city);
//       const [landMark, setLandMark] = useState(card.landMark);
//             const [category, setCategory] = useState(card.category);
//     //   const [category, setCategory] = useState("");
//         let[update,setUpdate]=useState(false);
//          let[bookPop,setBookPop]=useState(false);

//          console.log("update",update);
         

//          console.log("card",card);
//            console.log("userData",userData);


//       const [backImage1, setBackImage1] = useState(null);
//       const [backImage2, setBackImage2] = useState(null);
//       const [backImage3, setBackImage3] = useState(null);
//       let [minDate,setMinDate]=useState("");
  
//        let navigate=useNavigate();

//        useEffect(()=>{
//         let today=new Date().toISOString().split('T')[0]
//         setMinDate(today);
//        },[])

//        console.log("minDate",minDate);
       

//         useEffect(()=>{
//          if(checkIn && checkOut){
//             let inDate=new Date(checkIn)
//             let outDate=new Date(checkOut)
//             let n=(outDate-inDate)/(24*60*60*1000)
//             setNight(n)
//             let charge=(card.rent*(7/100))
//             if(n>0){
//                 setTotal((card.rent*n)+charge+charge)
//             }
//             else{
//                 setTotal(0);
//             }
//          }
//        },[checkIn,checkOut,card.rent])

   
//     const handleImage1 = (e) => {
//         const file = e.target.files[0];
//         setBackImage1(file);
       
//     };

//     const handleImage2 = (e) => {
//         const file = e.target.files[0];
//         setBackImage2(file);
     
//     };

//     const handleImage3 = (e) => {
//         const file = e.target.files[0];
//         setBackImage3(file);
//     };


//       async function handleDelete() {
//         if (!window.confirm("Are you sure you want to delete this listing?")) return;
//     try {
//       const result = await axios.delete(`${serverurl}/auth/DeleteListing/${card._id}`, {
//         withCredentials: true
//       });
      
//       // setNewCard(result.data)
//            toast.success(result.data.message)

//       console.log("DeleteCard fetched:", result.data);
//       navigate("/")

//     } catch (e) {
//             toast.error(e.response.data.message)

  
//       console.log("Error fetching user:", e.response?.data || e.message);
//     }
//   }


//          async function handleClick() {
//             try {
          
      
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append("rent", rent);
//       formData.append("city", city);
//       formData.append("landMark", landMark);
  

//       if (backImage1) formData.append("image1", backImage1);
//       if (backImage2) formData.append("image2", backImage2);
//       if (backImage3) formData.append("image3", backImage3);

//       const result = await axios.post(`${serverurl}/auth/listing/updateListing/${card._id }`, formData, {
//         withCredentials: true,
       
//       });

//       toast.success(" Update Succesfull")



      
//       console.log("updatelisting",result.data);
//       navigate('/')
    
//  setTitle("")
//  setDescription("")
// setRent("")
// setCity("")
// setLandMark("")

// setBackImage1(null)
// setBackImage2(null)
// setBackImage3(null)

     
//     } catch (e) {
//       console.log("Error uploading listing:", e.response?.data || e.message);
//       toast.error(e.response.data.message)
//     }
            
//          }

//        return (
    
  
//       <div style={{ display: "flex", justifyContent: "center",flexDirection:"column", alignItems: "center", width: "100%", height: "100vh", position: "relative",gap:"2rem"}}>
   

//   <div
//     style={{
//       display: "flex",
//       justifyContent: "center",
//       flexDirection: "column",
//       alignItems: "center",
//       width: "100%",
//       height: "100vh",
//       filter: update ? "blur(4px)" : "none", // Blur when editing
//       transition: "0.3s ease"
//     }}
//   >

             
//                 <h3
//                        style={{ position: "absolute", top: "2rem", left: "2rem", cursor: "pointer" }}
//                        onClick={() => navigate("/")}
//                    >
//                        Back
//                    </h3>
   
//                       <div style={{border:"2px solid blue"}}>
//                      <h1>View Card </h1>
//                      </div>
   
//                    <div style={{border:"2px solid blue" ,display:"flex",flexDirection:"column",gap:"2rem"}}>

//                    <div>
//                     <img src={card.image1} alt="" /><br />
//                        <img src={card.image2} alt="" /><br />
//                           <img src={card.image3} alt="" /><br />
//                     </div>        
                 
//                 <div>
//                 <h3>{` ${card.title.toUpperCase()},${card.category.toUpperCase()}  ,${card.landMark.toUpperCase()}  `}</h3>
//             </div>

//             <div>
//                 <h3>{` ${card.description.toUpperCase()}, `}</h3>
//             </div>

//             <div>
//                 <h3>{`Rs.${card.rent} `}</h3>
//             </div>
//                <div>
//                 <h3>Rating {card.ratings}</h3>
//             </div>



// {userData._id==card.host &&<button onClick={()=>setUpdate(pre=>!pre)}>Editng</button>
// }

// {userData._id!=card.host &&<button onClick={()=>setBookPop(pre=>!pre)}>booking</button>
//          } 
//          </div>  

//     </div>

//   {/* Edit Fullscreen Modal */}
//   {update && (
//     <div
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         backgroundColor: "rgba(255, 255, 255, 0.2)",
//         zIndex: 10,
//         display: "flex",
//         flexDirection: "column",
//         gap: "1rem",
//         alignItems: "center",
//         justifyContent: "center",
//         fontSize:"1.2rem",
//         color:"white",
      
//         // fontWeight:"lighter"
//         // fontWeight:,
        
         
//       }}
//     >
//       <h3
//         style={{ position: "absolute", top: "2rem", left: "2rem", cursor: "pointer" }}
//         onClick={() => setUpdate(false)}
//       >
//         Back
//       </h3>
//       <h1>Editing Form Section</h1>
//       <form style={{height:"100%",width:"400px",  backgroundColor:"#213547",borderRadius:"4px",display:"flex",flexDirection:"column", padding:"1rem"}}
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                handleClick();
                    

//                 }}
//             >


//                 <label>Title</label><br />
//                 <input type="text" required onChange={(e) => setTitle(e.target.value)} value={title}
//  /><br />

//                 <label>Description</label><br />
//                 <textarea required onChange={(e) => setDescription(e.target.value)} value={description}></textarea><br />

//                 <label>Image1</label><br />
//                 <input required style={{ border: "1px solid grey" }} type="file" onChange={handleImage1}  /><br />

//                 <label>Image2</label><br />
//                 <input required style={{ border: "1px solid grey" }} type="file" onChange={handleImage2} /><br />

//                 <label>Image3</label><br />
//                 <input required style={{ border: "1px solid grey" }} type="file" onChange={handleImage3} /><br />

//                 <label>Rent</label><br />
//                 <input type="number" required  onChange={(e) => setRent(e.target.value)} value={rent}  /><br />

//                 <label>City</label><br />
//                 <input type="text" required  onChange={(e) => setCity(e.target.value)} value={city} /><br />

//                 <label>LandMark</label><br />
//                 <input type="text" required onChange={(e) => setLandMark(e.target.value)} value={landMark} /><br />

//                 <button style={{width:"9rem",height:"34px"}} >Updating Listing</button>
//                   <button style={{width:"9rem",height:"34px"}} onClick={handleDelete} >Delete</button>
//             </form>
//    </div>)}
//     {bookPop && (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//        backgroundColor: "rgba(0, 0, 0, 0.6)",
//         zIndex: 10,
//         display: "flex",
//         // flexDirection: "column",
//         gap: "1rem",
//         alignItems: "center",
         
//         justifyContent: "center",
//         fontSize:"1.2rem",
//         color:"white",
    
     
        
      
//         // fontWeight:"lighter"
//         // fontWeight:,
        
         
//       }}
//     >
//     <form style={{ backgroundColor:"grey",
//        height:"400px",
//         width:"300px",
//         display: "flex",
//         flexDirection: "column",
//         padding:"1rem",
//         gap: "1rem",
//         alignItems: "center",
//         borderRadius:"7px"}} onClick={(e)=>e.preventDefault()}>
//       <h3
//         style={{ position: "absolute", top: "2rem", left: "2rem", cursor: "pointer" }}
//         onClick={() => setBookPop(false)}
//       >
//         Back
//       </h3>
//       <h1>Booking Section</h1>
//       <div>
//         YOUR TRIP-
//       </div>

//         <div>
//         <label htmlFor="">CheckIN</label>
//        <input type="date" min={minDate} required onChange={(e)=>setCheckIn(e.target.value)} value={checkIn} />
//       </div>

//        <div>
//         <label htmlFor="">CheckOut</label>
//        <input type="date" min={minDate} required  onChange={(e)=>setCheckOut(e.target.value)} value={checkOut}  />
//       </div>
//       <div >
//         <button onClick={()=>handleBooking(card._id)}>Book Now</button>
//       </div>
//     </form>

// <div style={{ backgroundColor:"grey",
//        height:"400px",
//         width:"400px",
//         display: "flex",
//         flexDirection: "column",
//         padding:"1rem",
//         gap: "1rem",
//         alignItems: "center",
//         borderRadius:"7px"}}
// >
//     <div style={{border:"2px solid red", width:"100%" ,display:"flex"}}>
//         <img src={card.image1} alt="" width="15%" />
//         <div style={{border:"2px solid red", width:"80%"}}>
//                 <h3>{` ${title.toUpperCase()},${category.toUpperCase()}  ,${landMark.toUpperCase()}  `}</h3>
         

            
//                 <h3>{` ${description.toUpperCase()}, `}</h3>
//         </div>
//     </div>
//     <div style={{border:"2px solid red" ,width:"100%",display:"flex",flexDirection:"column"}}>
//         <h4>Booking Price-</h4>
//         <p>
//             <span style={{float:"left"}}>{card.rent} X {night} nights</span>
//             <span style={{float:"right"}}>{card.rent*night}</span>
//         </p>
//         <p>
//             <span style={{float:"left"}}>Airbnb Charge</span>
//             <span style={{float:"right"}}>`${card.rent*7/100}`</span>
//         </p>
//          <p>
//             <span style={{float:"left"}}>Tax</span>
//             <span style={{float:"right"}}>`${card.rent*7/100}`</span>
//         </p>
//         <hr />
//           <p>
//             <span style={{float:"left"}}>Total</span>
//             <span style={{float:"right"}}>{total}</span>
//         </p>
//     </div>
// </div>

      
//    </div>)}
//            </div>
        
//        );
// }

// export default ViewCard;
//  *}
