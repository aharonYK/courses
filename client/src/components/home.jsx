import React from "react";
import {useState,useEffect,useContext} from 'react'
import axios from 'axios';
import react from '../images/logo-og.jpg';
import docker from '../images/docker.jpg';
import java from '../images/java.jpg';
import javascript from '../images/javascript.jpg';
import mongo from '../images/mongo.jpg';
import python from '../images/python.jpg';
import sql from '../images/sql.jpg';

import { useNavigate } from 'react-router-dom';


const Home = (props) => {
    
    useEffect(() => {
        const button = document.querySelector('.back-to-top-button');
        button.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        window.addEventListener('scroll', () => {
          if (window.pageYOffset > 20) {
            document.body.classList.add('scrolled');
          } else {
            document.body.classList.remove('scrolled');
          }
        });
      }, []);

    return (
         <div>
        <table class="home">
<tr>
    <td>
    <div class="card" id='mongo'>
    <img src={react} class='homeImage' alt="Logo" />;
    <button class="btn">
    <span>Enter Course &#9998;</span>
</button></div>
    </td>
    <td>
    <div class="card">
    <img src={docker} class='homeImage' alt="Logo" />;
    <button class="btn">
    <a>Enter Course &#9998;</a>
</button>
    </div>
    </td>
</tr>
<tr >
<td>
 <div class="card">
 <img src={java} class='homeImage' alt="Logo" />;
 <button class="btn">
    <a>Enter Course &#9998;</a>
</button>
 </div>
 </td>
 <td>
 <div class="card">
 <img src={javascript} class='homeImage' alt="Logo" />;
 <button class="btn">
    <a>Enter Course &#9998;</a>
</button>
 </div>
 </td>
</tr>
<tr >
<td>
    <div class="card">
    <img src={mongo} class='homeImage' alt="Logo" />;
    <button class="btn">
    <a>Enter Course &#9998;</a>
</button>
    </div>
    </td>
    <td>
 <div class="card">
 <img src={python} class='homeImage' alt="Logo" />;
 <button class="btn">
    <a>Enter Course &#9998;</a>
</button>
 </div>
 </td>
</tr>

<tr >
<td>
    <div class="card">
    <img src={sql} class='homeImage' alt="Logo" />;
    <button class="btn">
    <a>Enter Course &#9998;</a>
</button>
    </div>
    </td>
</tr>
        </table>
        <button class='back-to-top-button'>
    <div class="text">
        <span>Back</span>
        <span>to</span>
        <span>top</span>
    </div>
    <div class="clone">
        <span>Back</span>
        <span>to</span>
        <span>top</span>
    </div>
    <svg width="20px" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
</button>
    </div> );
}
 
export default Home;