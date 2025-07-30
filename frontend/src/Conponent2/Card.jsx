import React, { useContext, useState } from 'react';
import { DataContext } from '../Context/DataProvider';
import { useNavigate } from 'react-router-dom';
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";


function Card({title,description,rent,city,landMark,image1,image2,image3,id,ratings,isBooked,host,category}) {
  
    let {userData,listingData,handleCard,cancelBooking}=useContext(DataContext)
    let navigate=useNavigate();
    console.log('isBooked',isBooked);

    console.log("user data(card)",userData);
    
    cancelBooking
    

 function handleCancel(id) {
  const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
  
  if (confirmCancel) {
    if (userData) {
      cancelBooking(id); 
      navigate('/');
    } else {
      navigate('/login');
    }
  }
}

        function handleClick(id){
        if(userData){
          handleCard(id);
          navigate('/')
        }
        else{
    navigate("/login");
        }

    }
    return (
      <div className="card-container" onClick={() => !isBooked ? handleClick(id) : null}>
  {isBooked && (
    <div className="booked-badge">
      <GiConfirmed />Booked
    </div>
  )}

  {isBooked && host === userData?._id && (
    <div className="cancel-badge" onClick={() => handleCancel(id)}>
      <FcCancel />Cancel
    </div>
  )}

  {/* IMAGE SCROLLER */}
  
  <div className="image-scroll">
    <img src={image1} alt="img1" />
    <img src={image2} alt="img2" />
    <img src={image3} alt="img3" />
  </div>

  {/* TEXT INFO */}
  <div className="card-info">
    <span>In {landMark.toUpperCase()}, {city.toUpperCase()}</span><br />
    <span>{title.toUpperCase()}</span><br />
    <span>Near {category}</span><br />
    <span  style={{color:"red"}}>Rs. {rent}/day</span><br />
  </div>
  
</div>

       
    );
}

export default Card;








//  <div style={{border:"4px solid red",position:"relative"}} onClick={()=>!isBooked?handleClick(id):null}>
//           { isBooked &&  <div style={{position:"absolute",backgroundColor:"greenyellow",
//                 padding:"0.3rem",color:"green",right:"2px",top:"5px",borderRadius:"5px",cursor:"pointer",
//                 fontWeight:"bolder", display:"flex",justifyContent:"center",alignItems:"center",gap:"7px"}}>
//                 <GiConfirmed />Booked</div>}
//            { isBooked &&  host==userData?._id &&  <div style={{position:"absolute",backgroundColor:"white",
//                 padding:"0.3rem",color:"red",right:"2px",top:"55px",borderRadius:"5px",cursor:"pointer",
//                 fontWeight:"bolder", display:"flex",justifyContent:"center",alignItems:"center",gap:"7px"
//                 }} onClick={()=>handleCancel(id)}>
//              <FcCancel />Cancel
//                 </div>
// }
//             <div>
                
//                 <img src={image1} alt="" />
//                  <img src={image2} alt="" />
//                   <img src={image3} alt="" />
//             </div>
//             <div>
//                 <span>In {landMark.toUpperCase()},{city.toUpperCase()}</span><br />
//                                <span>{title.toUpperCase()}</span><br />
//                                <span>near {category}</span><br />
//                 <span>res. {rent}/day</span><br />
            

//             </div>
//         </div>