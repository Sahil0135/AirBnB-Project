import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Conponent2/Card';
import { DataContext } from '../Context/DataProvider';

function MyBooking(props) {
     let {listingData, setListingData,
newList, setNewList,userData}=useContext(DataContext)
        let navigate=useNavigate();
        console.log("userDataBooking",userData);
        
    return (
                <div style={{border:"2px solid red", display: "flex",flexDirection:"column", alignItems: "center", width: "100%", height: "100vh", position: "relative",gap:"2rem",padding:"2rem"}}>

         {/* <div style={{ display: "flex", justifyContent: "center",flexDirection:"column", alignItems: "center", width: "100%", height: "100vh", position: "relative",gap:"2rem"}}> */}

          
              <h3
            
                style={{
                    position: "absolute", top: "2rem", left: "2rem", cursor: "pointer", backgroundColor: "lightblue",
                    height:"3rem",
                    paddingTop:"0.5rem",
                    color: " #007bff",
                    borderRadius:"4px",
                   

                    // /* border: 2px solid grey; */
                    width: "5.5rem",
                    paddingLeft:"1.3rem",
                   
                   
                    

                    }}
                    onClick={() => navigate("/")}
                >
                    Back
                </h3>

                   <div style={{borderBottom:"3px solid blue"}}>
                  <h1>My Booking </h1>
                  </div>

                   <div style={{border:"2px solid blue"}}>
                {
                 userData && userData.booking.map((item)=>(
                 
                    
                      <Card title={item.title} description={item.description} rent={item.rent} city={item.city}
                      landMark={item.landMark} image1={item.image1} image2={item.image2} ratings={item.ratings} category={item.category} isBooked={item.isBooked} image3={item.image3} id={item._id} />

                      )  )
                }
            </div>
        </div>
    );
}

export default MyBooking;