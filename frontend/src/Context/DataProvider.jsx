import axios from 'axios';
import React, { useEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const DataContext = createContext();

function DataProvider({ children }) {
  const serverurl = "http://localhost:8000";
  const navigate=useNavigate();

  const [userData, setUserData] = useState(null);

 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rent, setRent] = useState("");
  const [city, setCity] = useState("");
  const [landMark, setLandMark] = useState("");
  const [category, setCategory] = useState("");
    const [adding, setAdding] = useState(false);
        const [updating, setUpdating] = useState(false);
                const [deleting, setDeleting] = useState(false);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [total, setTotal] = useState(0);
  const [night, setNight] = useState(0);
   const [booking, setBooking] = useState([]);


  const [frontImage1, setFrontImage1] = useState(null);
  const [frontImage2, setFrontImage2] = useState(null);
  const [frontImage3, setFrontImage3] = useState(null);
  const [backImage1, setBackImage1] = useState(null);
  const [backImage2, setBackImage2] = useState(null);
  const [backImage3, setBackImage3] = useState(null);
  const [listingData, setListingData] = useState([]);
  const [newList, setNewList] = useState([]);
  const [card, setNewCard] = useState(null);

  async function addListing() {
    setAdding(true)
    try {
          console.log("addListing",title, 
description,
rent, 
city, 
landMark,
category);
      
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landMark", landMark);
      formData.append("category", category);

      if (backImage1) formData.append("image1", backImage1);
      if (backImage2) formData.append("image2", backImage2);
      if (backImage3) formData.append("image3", backImage3);

      const result = await axios.post(`${serverurl}/auth/listing/add`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
         setAdding(false)
toast.success("AddListing Succesful")
//  await getListing();
  navigate('/');

      
      console.log("addlisting",result.data);
    
 setTitle("")
 setDescription("")
setRent("")
setCity("")
setLandMark("")
 setCategory("")
 setFrontImage1(null)
 setFrontImage2(null)
 setFrontImage3(null)
setBackImage1(null)
setBackImage2(null)
setBackImage3(null)

      console.log("Listing uploaded:", result.data);
    } catch (e) {
        setAdding(false)
      toast.error(e.response.data.message)
      console.log("Error uploading listing:", e.response?.data || e.message);
    }
  }


    async function getListing() {
    try {
      console.log("get Listing---------------------");
      
      // console.log("dssd");
//       console.log(title, 
// description,
// rent, 
// city, 
// landMark,
// category);
      
      
      const result = await axios.get(`${serverurl}/auth/getListing`, {
        withCredentials: true
      });

      console.log("hello");

      console.log("get Listing-----",result.data);
      
      
    
      setListingData(result.data); 
       setNewList(result.data); 
      
    
      console.log("listing Data",listingData);
      
      console.log("getListing fetched:", result.data);
    } catch (e) {
    
      console.log("Error fetching list:", e.response?.data || e.message);
    }
  }

    async function handleCard(id) {
    try {
      const result = await axios.get(`${serverurl}/auth/findListing/${id}`, {
        withCredentials: true
      });
      
      setNewCard(result.data)
     
      console.log("handleCard fetched:", result.data);
      navigate("/card")

    } catch (e) {
      setUserData(null);
      console.log("Error fetching user:", e.response?.data || e.message);
    }
  }

  
    async function handleBooking(id) {
    try {
      console.log("handleBooking",id);
      
      const result = await axios.post(`${serverurl}/auth/booking/${id}`, {
        checkIn,checkOut,totalRent:total},{
        withCredentials: true
      });
      console.log("booking data",result.data.booking);
      
      await getUser()
      await getListing()
      setBooking(result.data.booking)
     
     
      console.log("handleCard fetched:", result.data);
      navigate("/orderbook")
      toast.success(result.data.message)

    } catch (e) {
  setUserData(null);
        toast.error(e.response.data.message)
  
  console.log("Error fetching user:", e.response?.data || e.message);
}}

 async function cancelBooking(id) {
   

  try {
     console.log("cancelBooking",id);
      
      const result = await axios.delete(`${serverurl}/auth/cancelBooking/${id}`,{
        withCredentials: true
      });
      
      await getUser()
      await getListing()
      console.log("booking cancel data",result.data);
      toast.success(result.data.message)
      
      
    
  } catch (e) {
          toast.error(e.response.data.message)
    

    console.log(e);
    

    
  }
     
      
    }
  


  async function getUser() {
    try {
      const result = await axios.get(`${serverurl}/auth/getUser`, {
        withCredentials: true
      });
      setUserData(result.data);
      console.log("User fetched:", result.data);
      console.log("User booking:", result.data.listing);
    } catch (e) {
      setUserData(null);
      console.log("Error fetching user:", e.response?.data || e.message);
    }
  }
useEffect(() => {
    getListing();
  }, [adding,updating,deleting]);
  useEffect(() => {
    getUser();
  }, [adding]);

  // Context value
  const data = {
    serverurl,
    userData,
    setUserData,
    getUser,
    addListing,
    listingData,
    setListingData,
    getListing,
    newList,
    setNewList,
    handleCard,
    deleting,
    setDeleting,
  card,setNewCard,
  checkIn, setCheckIn, 
checkOut, setCheckOut,
total, setTotal,
night, setNight,
booking,setBooking,
cancelBooking,
adding,setAdding,
updating,setUpdating,
    // Form state
    title, setTitle,
    description, setDescription,
    rent, setRent,
    city, setCity,
    landMark, setLandMark,
    category, setCategory,
    handleBooking,

    // Image state
    frontImage1, setFrontImage1,
    frontImage2, setFrontImage2,
    frontImage3, setFrontImage3,
    backImage1, setBackImage1,
    backImage2, setBackImage2,
    backImage3, setBackImage3
  };

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;


















// import axios from 'axios';
// import React, { useEffect, useState, createContext } from 'react';

// export const DataContext = createContext();

// function DataProvider({ children }) {
//   const serverurl = "http://localhost:8000";

//   const [userData, setUserData] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const [frontImage1, setFrontImage1] = useState(null);
//   const [frontImage2, setFrontImage2] = useState(null);
//   const [frontImage3, setFrontImage3] = useState(null);
//   const [backImage1, setBackImage1] = useState(null);
//   const [backImage2, setBackImage2] = useState(null);
//   const [backImage3, setBackImage3] = useState(null);

//   const [city, setCity] = useState("");
//   const [rent, setRent] = useState("");
//   const [landMark, setLandMark] = useState("");
//   const [category, setCategory] = useState("");

 

// async function addListing() {
//    try {
//      let formData=new FormData()
//    formData.append("title",title)
//     formData.append("image1",backImage1)
//      formData.append("image2",backImage2)
//       formData.append("image3",backImage3)
//        formData.append("description",description)
//         formData.append("rent",rent)
//          formData.append("city",city)
//           formData.append("landMark",landMark)
//            formData.append("category",category)
//       const result = await axios.post(`${serverurl}/auth/listing/add`,formData, {
//         withCredentials: true
//       });

    
//       console.log("User fetched:", result.data);
//     } catch (e) {
  
//       console.log("Error fetching user:", e.response?.data || e.message);
//     }
  
// }

//   async function getUser() {
//     try {
//       const result = await axios.get(`${serverurl}/auth/getUser`, {
//         withCredentials: true
//       });

//       setUserData(result.data);
//       console.log("User fetched:", result.data);
//     } catch (e) {
//       setUserData(null);
//       console.log("Error fetching user:", e.response?.data || e.message);
//     }
//   }

//   useEffect(() => {
//     getUser();
//   }, []);

//   const data = {
//     serverurl,
//     userData,
//     setUserData,
//     getUser,

//     title, setTitle,
//     description, setDescription,
//     frontImage1, setFrontImage1,
//     frontImage2, setFrontImage2,
//     frontImage3, setFrontImage3,
//     backImage1, setBackImage1,
//     backImage2, setBackImage2,
//     backImage3, setBackImage3,
//     city, setCity,
//     rent, setRent,
//     landMark, setLandMark,
//     category, setCategory
//   };

//   return (
//     <DataContext.Provider value={data}>
//       {children}
//     </DataContext.Provider>
//   );
// }

// export default DataProvider;
