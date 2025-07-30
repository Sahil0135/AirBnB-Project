import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBars, FaUserCircle } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { MdOutlinePool, MdBedroomParent } from "react-icons/md";
import { IoBedSharp } from "react-icons/io5";
import { GiShop, GiSpookyHouse, GiWoodCabin } from "react-icons/gi";
import { FaTreeCity, FaBuildingUser } from "react-icons/fa6";
import { DataContext } from '../Context/DataProvider';
import { toast } from 'react-hot-toast';
import airBnbB from "../assets/airBnB.png"
import { IoSearchOutline } from "react-icons/io5";
import '../CSS/Nav.css'

function Nav() {
  const navigate = useNavigate();
  const [showPop, setShowPop] = useState(true);
  const { serverurl, userData, setUserData,listingData,setListingData,newList,setNewList } = useContext(DataContext);
  let  [cate,setCate]=useState("");
  console.log("Nav",newList);
   const [val, setVal] = useState("");
  

// useEffect(() => {


//   Categorie(); // Call when category2 changes
// }, [category2]);

  function Categorie(category){
      setCate(category)
    
      if(category=="trending"){
           setNewList(listingData);

      }
      else{

    //  console.log("listingData NAv-----",listingData);
   setNewList(listingData.filter((item)=>item.category==category));
    // console.log("category2-----",category2);
      }
   
   }
  
 

  async function handleLogout() {
    try {
      const result = await axios.post(`${serverurl}/auth/logout`, {}, { withCredentials: true });
      setUserData(null);
      console.log(result.data);
      toast.success(result.data.message)
    } catch (e) {
        toast.error(e.response.data.message)
      console.log("Logout error:", e.response?.data || e.message);
    }
  }

   function handleSearch(val){
  setVal(val)
  console.log(val);
  
    const filteredItems = listingData.filter((item) =>
    item.title.toLowerCase().includes(val.toLowerCase()) ||
    item.description.toLowerCase().includes(val.toLowerCase()) ||
    item.city.toLowerCase().includes(val.toLowerCase()) ||
    item.landMark.toLowerCase().includes(val.toLowerCase())||
     item.category.toLowerCase().includes(val.toLowerCase())
  );
  setNewList(filteredItems);


 }


  return (
    <div>
      {/* Top Nav Bar */}
      <div className="navbar-container">
  <div className="logo-container"><img src={airBnbB} alt="logo" /></div>

  <div className="search-box">
    <input type="text" placeholder="Anywhere | Any Location | Any City" onChange={(e)=>handleSearch(e.target.value)} value={val} />
    <span className="search-icon"><IoSearchOutline /></span>
  </div>

  <div >
    <span style={{ cursor: "pointer" }} onClick={() => navigate('/listing')}>List your Home</span>&nbsp;

    <button style={{height:"3rem",width:"5.6rem",color:"white",fontSize:"1rem"}} className="profile-menu" onClick={() => setShowPop(prev => !prev)}>
      <FaBars />&nbsp;&nbsp;
      {userData == null ? <FaUserCircle /> : (
        <span style={{ backgroundColor: "black", color: "white", borderRadius: "50%", padding: "0.5rem" }}>
          {userData.name?.slice(0, 1).toUpperCase()}
        </span>
      )}
      
    {!showPop && (
      <div className="profile-dropdown">
        <ul>
          {!userData && <li onClick={() => navigate("/login")}>Login</li>}
          {userData && <li onClick={handleLogout}>Logout</li>}
          <hr />
          <li onClick={() => navigate('/listing')}>List your Home</li>
          <li onClick={() => navigate('/myList')}>My Listing</li>
          <li onClick={() => navigate('/mybook')}>My Booking</li>
        </ul>
      </div>
    )}
    </button>

  </div>
</div>

{/* Category Filter */}
<div className="categories">
  <div className='center' style={{ border: cate == "trending" ? "2px solid grey" : "" }} onClick={() => Categorie("trending")}>
    <BsFire /><div>Trending</div>
  </div>
  <div className='center' style={{ border: cate == "poolHome" ? "2px solid grey" : "" }} onClick={() => Categorie("poolHome")}>
    <MdOutlinePool /><div>Pool Home</div>
  </div>
  <div className='center' style={{ border: cate == "PG" ? "2px solid grey" : "" }} onClick={() => Categorie("PG")}>
    <IoBedSharp /><div>PG</div>
  </div>
  <div className='center' style={{ border: cate == "shop" ? "2px solid grey" : "" }} onClick={() => Categorie("shop")}>
    <GiShop /><div>Shop</div>
  </div>
  <div className='center' style={{ border: cate == "villa" ? "2px solid grey" : "" }} onClick={() => Categorie("villa")}>
    <GiSpookyHouse /><div>Villa</div>
  </div>
  <div className='center' style={{ border: cate == "farmHouse" ? "2px solid grey" : "" }} onClick={() => Categorie("farmHouse")}>
    <FaTreeCity /><div>Farm House</div>
  </div>
  <div className='center' style={{ border: cate == "cabin" ? "2px solid grey" : "" }} onClick={() => Categorie("cabin")}>
    <GiWoodCabin /><div>Cabin</div>
  </div>
  <div className='center' style={{ border: cate == "flat" ? "2px solid grey" : "" }} onClick={() => Categorie("flat")}>
    <FaBuildingUser /><div>Flat</div>
  </div>
  <div className='center' style={{ border: cate == "room" ? "2px solid grey" : "" }} onClick={() => Categorie("room")}>
    <MdBedroomParent /><div>Rooms</div>
  </div>
</div>

    </div>
  );
}

export default Nav;







// <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" ,width:"100%",padding:"1rem"}}>
//         <div style={{width:"12%"}}><img style={{width:"60%"}} src={airBnbB} alt="" /></div>

//         <div style={{width:"60%",position:"relative"}}> 
//           <input style={{border:"2px solid grey",
//             height:"3rem",borderRadius:"10px", width:"100%",padding:"1rem"}} type="text" placeholder="Any where | Any Location | Any City" onChange={(e)=>handleSearch(e.target.value)} value={val} />
//           <span style={{position:"absolute",height:"2rem",width:"2rem",
//             backgroundColor:"red",
//             color:"white",
//             fontWeight:"bolder",
//             right:"9px",
//             top:"4px",
//             borderRadius:"50%",display:"flex",justifyContent:"center",
//            alignItems:"center" }}><IoSearchOutline /></span>
//         </div>

//         <div >
//           <span style={{cursor:"pointer"}} onClick={()=>navigate('/listing')}>List your Home</span>&nbsp;

//           <button  onClick={() => setShowPop(prev => !prev)} style={{borderRadius:"10%",backgroundColor:"aliceblue",
//           color:"black",
//           border:"2px solid grey",
//           position: "relative",
//            width: "107px", height: "54px", fontSize: "1.2rem" }}>
//             <FaBars />&nbsp;&nbsp;
//             {userData == null ? (
//               <FaUserCircle />  
//             ) : (
//               <span style={{
//                 width: "2rem",
//                 height: "2rem",
//                 backgroundColor: "black",
//                 borderRadius: "50%",
//                 display: "inline-block",
//                 color: "white",
//                 textAlign: "center"
//               }}>
//                 {userData.name?.slice(0, 1).toUpperCase()}
//               </span>
//             )}
//           </button>

//           {!showPop && (
//             <div style={{ width: "150px", backgroundColor: "lightgrey", height: "150px", position: "absolute" 
//             ,zIndex:"10",borderRadius:"10px",right:"65px",top:"69px"}}>
//               <ul style={{height:"100%",width:"100%",alignItems:"center",
//                listStyle: "none",display:"flex",flexWrap:"wrap",

//                 flexDirection:"column",justifyContent:"space-evenly", cursor: "pointer" }}>
//               {!userData?   <li onClick={() => navigate("/login")}>Login</li>:""}
//              {userData? <li onClick={()=>handleLogout()}>Logout</li>:""

//              }   
//                 <hr style={{width:"76%",color:"red"}} />
//                 <li onClick={()=>navigate('/listing') }>List your Home</li>
//                 <li style={{cursor:"pointer"}} onClick={()=>navigate('/myList')}>My Listing hj</li>
//                 <li onClick={()=>navigate('/mybook')}>My Booking</li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
   
//       {/* Categories */}
//       <div style={{
     
//         display: "flex",
   
    
//         justifyContent: "space-between",
//         width: "70%",
        
//         alignItems:"center",
//         // fontSize:"1rem",
//         margin: "0 auto",
//         flexWrap: "wrap",
//         // padding:"1rem"
//       }}>
//         <div className='center'  style={
//           {
//             border: cate=="trending"?"2px solid grey":""
//           }
//         }  onClick={()=>{   Categorie("trending");
//         }}><div><BsFire /></div><div>Trending</div></div>

//         <div  className='center' style={
//           {
//             border: cate=="poolHome"?"2px solid grey":""
//           }
//         }  onClick={()=>{   Categorie("poolHome");
//         }}><span><MdOutlinePool /></span><span>Pool Home</span></div>


//         <div className='center' style={
//           {
//             border: cate=="PG"?"2px solid grey":""
//           }
//         }  onClick={()=>{   Categorie("PG");
//         }}><span><IoBedSharp /></span><span>PG</span></div>

//         <div className='center' style={
//           {
//             border: cate=="shop"?"2px solid grey":""
//           }
//         }  onClick={()=>{   Categorie("shop");
//         }}><span><GiShop /></span><span>Shop</span></div>


//         <div className='center' style={
//           {
//             border: cate=="villa"?"2px solid grey":""
//           }
//         }  onClick={()=>{   Categorie("villa");
//         }}><span><GiSpookyHouse /></span><span>Villa</span></div>
//         <div className='center' style={
//           {
//             border: cate=="farmHouse"?"2px solid grey":""
//           }
//         }  onClick={()=>{   Categorie("farmHouse");
//         }}><span><FaTreeCity /></span><span>Farm House</span></div>

//         <div className='center'style={
//           {
//             border: cate=="cabin"?"2px solid grey":""
//           }
//         }  onClick={()=>{   Categorie("cabin");
//         }}><span><GiWoodCabin /></span><span>Cabin</span></div>

//         <div className='center' style={
//           {
//             border: cate=="flat"?"2px solid grey":""
//           }
//         }  onClick={()=>{   Categorie("flat");
//         }}><span><FaBuildingUser /></span><span>Flat</span></div>

//         <div className='center' style={
//           {
//             border: cate=="room"?"2px solid grey":""
//           }
//         }  onClick={()=>{   Categorie("room");
//         }}><span><MdBedroomParent /></span><span>Rooms</span></div>
//       </div>