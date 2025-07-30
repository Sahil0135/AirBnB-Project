

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePool, MdBedroomParent } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GiShop, GiSpookyHouse, GiWoodCabin } from "react-icons/gi";
import { FaTreeCity, FaBuildingUser } from "react-icons/fa6";
import { DataContext } from '../Context/DataProvider';


function ListingPage2(props) {
  const navigate = useNavigate();
      const {
    
          category, setCategory,
  
        
      } = useContext(DataContext);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
      position: "relative"
    }}>
      {/* Header */}
      <h3
        style={{ position: "absolute", top: "2rem", left: "2rem", cursor: "pointer"
          , backgroundColor: "lightBlue",
  border:" none",
  color:"blue",
 
  padding: "0.6rem",
  borderRadius:"4px"

         }}
        onClick={() => navigate("/")}
      >
        Back
      </h3>

      <h3 style={{ position: "absolute", top: "2rem", right: "2rem",cursor: "pointer"
          , backgroundColor: "lightblue",
  border:" none",
  color:"blue",
 
  padding: "0.6rem",
  borderRadius:"4px" }}>
        Set Your Category
      </h3>

      <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
        Which of these best describe your place
      </div>

      {/* Category Boxes */}
      <div style={{
        border: "2px solid grey",
        borderRadius:"5px",
        width: "600px",
        height: "400px",
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        boxSizing: "border-box"
      }}>
        <div style={{
          width: "140px",
          height: "100px",
          border: category=='poolHome'?"2px solid red":"2px solid grey",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }} onClick={()=>setCategory("poolHome")

        
        }>
          <MdOutlinePool />
          <span>Pool Home</span>
        </div>

        <div style={{
          width: "140px",
          height: "100px",
          border: category=='PG'?"2px solid red":"2px solid grey",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }} onClick={()=>setCategory("PG")}>
          <IoBedSharp />
          <span>PG</span>
        </div>

        <div style={{
          width: "140px",
          height: "100px",
          border: category=='shop'?"2px solid red":"2px solid grey",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }} onClick={()=>setCategory("shop")}>
          <GiShop />
          <span>Shop</span>
        </div>

        <div style={{
          width: "140px",
          height: "100px",
          border: category=='villa'?"2px solid red":"2px solid grey",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }} onClick={()=>setCategory("villa")}>
          <GiSpookyHouse />
          <span>Villa</span>
        </div>

        <div style={{
          width: "140px",
          height: "100px",
          border: category=='farmHouse'?"2px solid red":"2px solid grey",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }} onClick={()=>setCategory("farmHouse")}>
          <FaTreeCity />
          <span>Farm House</span>
        </div>

        <div style={{
          width: "140px",
          height: "100px",
          border: category=='cabin'?"2px solid red":"2px solid grey",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }} onClick={()=>setCategory("cabin")}>
          <GiWoodCabin />
          <span>Cabin</span>
        </div>

        <div style={{
          width: "140px",
          height: "100px",
          border: category=='flat'?"2px solid red":"2px solid grey",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }} onClick={()=>setCategory("flat")}>
          <FaBuildingUser />
          <span>Flat</span>
        </div>

        <div style={{
          width: "140px",
          height: "100px",
          border: category=='rooms'?"2px solid red":"2px solid grey",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }} onClick={()=>setCategory("rooms")}>
          <MdBedroomParent />
          <span>Rooms</span>
        </div>
      </div>

      {/* Next Button */}
      <div>
        <button style={{
          // width: "150px",
          // height: "30px",
          // marginTop: "20px",
          // cursor: "pointer"
           marginTop: "2rem",
  padding: "2px",
  height:"3rem",
 
  backgroundColor: "red",
  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "1rem",
        }}   
        onClick={() => {
       if (!category) {
      alert("Please select a category first!");
       return;
     }
     navigate("/listing3");
  }}
  
  >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListingPage2;










// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MdOutlinePool, MdBedroomParent } from "react-icons/md";
// import { IoBedSharp } from "react-icons/io5";
// import { GiShop, GiSpookyHouse, GiWoodCabin } from "react-icons/gi";
// import { FaTreeCity, FaBuildingUser } from "react-icons/fa6";

// function ListingPage2(props) {
//      let navigate=useNavigate();
//     return (
//         <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",height:"100vh",position:"relative"}}>
             
      
//                 <h3 style={{position:"absolute",top:"2rem",left:"2rem",cursor:"pointer"}}  onClick={()=>navigate("/")}>Back2</h3>
//                                <h3 style={{position:"absolute",top:"2rem",right:"2rem",cursor:"pointer"}}  >Set Your Category</h3>
// <div>which of these best describe your place</div>
               
//        <div style={{border:"2px solid red",width:"600px ",height:"400px",display:"flex",flexWrap:"wrap",gap:"10px",alignItems:"center"}}>
//           <div className='center' style={{width:"140px",border:"2px solid red",height:"100px"}}><MdOutlinePool /><span>Pool Home</span></div>
//                 <div className='center' style={{width:"140px",border:"2px solid red",height:"100px"}}><IoBedSharp /><span>PG</span></div>
//                 <div className='center' style={{width:"140px",border:"2px solid red",height:"100px"}}><GiShop /><span>Shop</span></div>
//                 <div className='center' style={{width:"140px",border:"2px solid red",height:"100px"}}><GiSpookyHouse /><span>Villa</span></div>
//                 <div className='center' style={{width:"140px",border:"2px solid red",height:"100px"}}><FaTreeCity /><span>Farm House</span></div>
//                 <div className='center' style={{width:"140px",border:"2px solid red",height:"100px"}}><GiWoodCabin /><span>Cabin</span></div>
//                 <div className='center' style={{width:"140px",border:"2px solid red",height:"100px"}}><FaBuildingUser /><span>Flat</span></div>
//                 <div className='center' style={{width:"140px",border:"2px solid red",height:"100px"}}><MdBedroomParent /><span>Rooms</span></div>

//        </div>
//        <div ><button style={{width:"150px",height:"30px"}}>Next</button></div>

  


            
//         </div>
//     );
// }

// export default ListingPage2;