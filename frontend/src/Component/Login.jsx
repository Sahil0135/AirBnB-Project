
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import { DataContext } from '../Context/DataProvider';
import { toast } from 'react-hot-toast';
import '../CSS/Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { serverurl, userData, setUserData } = useContext(DataContext);

  const handler = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        'http://localhost:8000/auth/login',
        { email, password },
        { withCredentials: true }
      );
      setUserData(result.data.user);
      toast.success(result.data.message);
      navigate('/');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Login failed');
      console.log('Login error:', e.response);
    }
  };

  return (
    <div className="login-container" style={{position:"relative"}}>
      <div className="login-box">
        <div  className="back-btn" onClick={() => navigate('/')}>Back</div>
        <h2 style={{textAlign:"center"}}>Login</h2>
        <form onSubmit={handler} className="login-form">
          <label>Email</label>
          <input type="email" required onChange={(e) => setEmail(e.target.value)} value={email} />

          <label>Password</label>
          <input type="password" required onChange={(e) => setPassword(e.target.value)} value={password} />

          <button style={{margin:"0 auto",padding:"4px"}} type="submit">Login</button>
        </form>

        <p className="signup-text">Create new account</p>
        <span className="signup-link" onClick={() => navigate('/signup')}>Signup</span>
      </div>
    </div>
  );
}

export default Login;


















// import React from 'react';
// import {useNavigate} from 'react-router-dom'
// import axios from 'axios';
// import { useContext } from 'react';
// import { DataContext } from '../Context/DataProvider';
// import { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import '../CSS/Login.css'
// function Login() {
//     const navigate=useNavigate();
  
   
//      let[email,setEmail]=useState("");
//       let[password,setPassword]=useState("");

//      let {serverurl,userData,setUserData}=useContext(DataContext);
  

//   const handler=async(e)=> {
//      e.preventDefault();
//     try{
//        console.log("fef");
//      let result=await axios.post("http://localhost:8000"+ "/auth/login",{email,password},{withCredentials:true})
//            console.log("second");
//            console.log(result.data);
           
//            console.log("login result",result.data);
//            console.log("userData",userData);
           

//            setUserData(result.data.user);
//            toast.success(result.data.message)
//            console.log("userData",userData);

//         navigate("/");
     
//     }
//     catch(e){
//                    toast.error(e.response.data.message)
//         console.log("error in login =>",e.response);
        

//     }
    
//   }

//     return (
//         <div>
//             <br />
//             <div onClick={()=>navigate('/')}>Back</div><br />
//             <form action="" onSubmit={handler}>
             
//                  <label htmlFor="">Email</label>
//                 <input type="email" required onChange={(e)=>setEmail(e.target.value)} value={email}/><br /><br />
//                  <label htmlFor="">Password</label>
//                 <input type="text" required onChange={(e)=>setPassword(e.target.value)} value={password} /><br /><br />
              
//                  <button>Login</button>
//             </form>
        
//                  <p>Create new account</p>
                 
//                  <span style={{color:"red",cursor:"pointer"}} onClick={()=>navigate('/signup')} >Signup</span>
//                  </div>
//     );
// }

// export default Login;