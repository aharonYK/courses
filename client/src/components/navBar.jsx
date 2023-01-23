import React from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal';

export default function NavBar() {
  const navigate=useNavigate();
  
  return (
    <nav class="navbar navbar-expand-lg bg-dark " data-bs-theme="dark">
    <div class="container-fluid">
    <a href="/"><button class="btnB" href="/">Home</button></a>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a href="/MyCourses"><button class="btnB" aria-current="page">My Courses</button></a>
        </li>
        <li class="nav-item">
       <a href="/auth"><button class="btnB" aria-current="page" >login</button></a>
        </li>
        <li class="nav-item">
        <a href="/register"><button class="btnB" aria-current="page" >signup</button></a>
        </li>
        <li class="nav-item">
          <button className='btnR' 
            onClick={()=>{
            localStorage.removeItem('token');
            navigate('/auth') }}>
            LogOut
          </button>
        </li>
      </ul>
   
  </div>
</nav>
  )
}
