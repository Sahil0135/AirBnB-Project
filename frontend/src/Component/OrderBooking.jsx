import React, { useContext } from 'react';
import { DataContext } from '../Context/DataProvider';
import { GiConfirmed } from "react-icons/gi";
import { Navigate, useNavigate } from 'react-router-dom';

function OrderBooking(props) {
    let {booking,total}=useContext(DataContext);
    console.log("OrderBooking",booking);
    let navigate=useNavigate();
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",border:"2px solid black",height:"100vh",width:"100%"}}>
            <div style={{border:"2px solid black",height:"60%",width:"50%",display:"flex",flexDirection:"column",justifyContent:"space-evenly",padding:"1rem"
                ,flexWrap:"wrap",borderRadius:"4px",
                boxShadow:"3px 3px 6px 4px grey"}}>
                <p className='center' style={{fontSize:"4rem",color:"green"}}><GiConfirmed /></p>
                <h3 className='center'> Booking Confirmed</h3>

                <div className='side'> 
                    <p>Booking Id:</p>
                      <p>{booking._id}</p>
              

                </div>

                <div className='side'>
                     <p>Owner Detail:</p>
                   <p> {booking.host?.email}</p>
                     </div>

                <div className='side' >
                    <p>Total rent:</p>
                    <p>{booking.totalRent}</p>
                    </div>

                 <div className='center' onClick={()=>navigate('/')}>  <button >Submit</button></div>  
            </div>
        </div>
    );
}

export default OrderBooking;