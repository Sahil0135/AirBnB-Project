import React, { useContext } from 'react';
import { DataContext } from '../Context/DataProvider';
import Card from '../Conponent2/Card';
import { useNavigate } from 'react-router-dom';

function MyListing(props) {
    let {userData}=useContext(DataContext)
    let navigate=useNavigate();
            console.log("userDataListing",userData);
    return (
        <div style={{border:"2px solid red", display: "flex",flexDirection:"column", alignItems: "center", width: "100%", height: "100vh", position: "relative",gap:"2rem",padding:"2rem",overflow:"auto"}}>

          
             <h3
            
                style={{
                    position: "absolute", top: "2rem", left: "2rem", cursor: "pointer", backgroundColor: "lightblue",
                    height:"3rem",
                    paddingTop:"0.4rem",
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
                  <h1>My Listing </h1>
                  </div>

                   <div style={{border:"2px solid blue",display:"flex",width:"80%",flexWrap:"wrap"}}>
                {
                  userData &&  userData.listing.map((item)=>(
                 
                    
                      <Card title={item.title} description={item.description} rent={item.rent} city={item.city}
                      landMark={item.landMark} image1={item.image1} image2={item.image2} image3={item.image3} id={item._id} category={item.category} isBooked={item.isBooked} ratings={item.ratings} host={item.host} />

                      )  )
                }
            </div>
        </div>
    );
}

export default MyListing;