
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataProvider';
import axios from 'axios';
import { AiFillAlert } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import '../CSS/Sign.css'; // ✅ Import external CSS

function Signup() {
  const navigate = useNavigate();
  const { serverurl, userData, setUserData } = useContext(DataContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handler = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(serverurl + "/auth/signup", { name, email, password }, { withCredentials: true });
      toast.success(result.data.message);
      setUserData(result.data.user);
      navigate("/");
    } catch (e) {
      toast.error(e.response?.data?.message || "Signup failed");
      console.log("error in signup =>", e.response?.data?.message);
    }
  };


  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="back-btn" onClick={() => navigate('/')}>← Back</div>

        <h2 style={{textAlign:"center"}}>Signup</h2>

        <form onSubmit={handler} className="signup-form">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required onChange={e => setName(e.target.value)} value={name} />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" required onChange={e => setEmail(e.target.value)} value={email} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" required onChange={e => setPassword(e.target.value)} value={password} />

          <button style={{margin:"0 auto",padding:"3px"}} type="submit">Signup</button>
        </form>

        <p className="login-text">Already have an account?</p>
        <span className="login-link" onClick={() => navigate("/login")}>Login</span>
      </div>
    </div>
  );
}

export default Signup;




















// import React, { useContext, useState } from 'react';
// import {useNavigate} from 'react-router-dom'
// import { DataContext } from '../Context/DataProvider'; 
// import axios from 'axios'
// import { AiFillAlert } from "react-icons/ai";
// import { toast } from 'react-hot-toast';


// function Signup() {
//     let navigate=useNavigate();
//     let {serverurl,userData,setUserData}=useContext(DataContext)
//     let[name,setName]=useState("");
//      let[email,setEmail]=useState("");
//       let[password,setPassword]=useState("");




//   const handler=async(e)=> {
//      e.preventDefault();
//     try{
//        console.log("fef");
//             // let result=await axios.get(serverurl+ "/auth/log",{withCredentials:true})

   
//      let result=await axios.post(serverurl+ "/auth/signup",{name,email,password},{withCredentials:true})
//      console.log("dsd");
     
         
//        console.log("signup result",result.data);
//         //    console.log("userData",userData);
           
//         //    await getUser();
//          toast.success(result.data.message)
       
//            setUserData(result.data.user);
//            console.log("userData2",userData);
    
//         navigate("/");
     
//     }
//     catch(e){
//         console.log("fedfed");
//         toast.error(e.response.data.message)
        
//         console.log("error in signup F",e.response.data.message);
        

//     }
    
//   }
//     return (
//         <div>
//                    <br />
//                    <div><AiFillAlert /></div>
//             <div onClick={()=>navigate('/')}>Back</div><br />
//             <form onSubmit={handler} action="">
//                 <label htmlFor="name">Name</label>
//                 <input type="text" id="name" required onChange={e=>setName(e.target.value)} value={name}/><br /><br />
//                  <label htmlFor="email">Email</label>
//                 <input type="email" id="email" onChange={e=>setEmail(e.target.value)} value={email} required/><br /><br />
//                  <label htmlFor="password">Password</label>
//                 <input type="text" required  onChange={e=>setPassword(e.target.value)} value={password} id="password"/><br /><br />
              
//                  <button >signup</button>
//                  <p>Already have account</p>
                 
//                  <span style={{color:"red",cursor:"pointer"}} onClick={()=>navigate("/login")}>Login</span>
//             </form>
//         </div>
//     );
// }

// export default Signup;