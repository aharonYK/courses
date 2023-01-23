import React from 'react'
import NavBar from './navBar'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Register from './register'
import Auth from './auth'
import Stock from './stock';
import Home from './home'
import Backround from './background';

export default function Main() {
  
 

    return (
    <div>
    <Backround/>
    <NavBar/>
    <Routes> 
      <Route path='/' element={<Home/>}/>
        <Route path="/MyCourses"  element ={ <Stock/>} />         
        <Route path="/register"  element ={ <Register/>} />         
        <Route path="/auth"  element ={ <Auth/>} />         
       
    </Routes>     

    </div>
  )
}
