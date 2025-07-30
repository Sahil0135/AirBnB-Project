
import './App.css'
import Login from './Component/Login'
import Signup from './Component/Signup'
import {Routes,Route, Navigate, useNavigate} from 'react-router-dom'
import Home from './Component/Home'
import ListingPage from './Component/ListingPage'
import ListingPage2 from './Component/ListingPage2'
import ListingPage3 from './Component/ListingPage3'

import { DataContext } from './Context/DataProvider'
import MyListing from './Component/MyListing'
import ViewCard from './Component/ViewCard'
import MyBooking from './Component/MyBooking'
import OrderBooking from './Component/OrderBooking'
import { useContext } from 'react'

function App() {
  // let  navigate=useNavigate()
  let {userData}=useContext(DataContext)

  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
       <Route path="/signup" element={<Signup/>}></Route>

      <Route path="/login" element={<Login />}></Route>
      <Route path="/listing" element={ userData!=null?<ListingPage />:<Navigate to={"/login"}/>}></Route>
      <Route path="/listing2" element={userData!=null?<ListingPage2 />:<Navigate to={"/"}/>}></Route>
      <Route path="/listing3" element={userData!=null?<ListingPage3 />:<Navigate to={"/"}/>}></Route>
      <Route path="/myList" element={userData!=null?<MyListing />:<Navigate to={"/login"}/>}></Route>
      <Route path="/card" element={userData!=null?<ViewCard />:<Navigate to={"/"}/>}></Route>
      <Route path="/mybook" element={userData!=null?<MyBooking />:<Navigate to={"/login"}/>}></Route>
      <Route path="/orderbook" element={userData!=null?<OrderBooking />:<Navigate to={"/"}/>}></Route>



   


          </Routes>
    
  
    
  )
}

export default App
