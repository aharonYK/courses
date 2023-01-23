
import React from 'react'
import {useState,useContext,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pop from '../images/logo-og.jpg'
import jwt_decode from "jwt-decode";


const Stock = (props) => {
    const[Data,setData]=useState([])
const token=localStorage.getItem('e-mail')
const token1=localStorage.getItem('authToken')
const ans=jwt_decode(token1,'x-auth-token')

async function getData(){
    const courses=await axios.get(`http://localhost:3200/api/courses/${ans.userId}`);
    setData(courses.data)
   
}

const handleDeleteClick = async (id_c, user_id) => {
    try {
      console.log(id_c);
      const token = localStorage.getItem("token") //get the token from local storage
      const response = await axios.delete(`http://localhost:3200/api/courses/${id_c}/${user_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }


//onClick={()=>dele(course.id,ans.userId)}
    useEffect(()=>{
        getData()
       
        
    },[])

    return ( 
    <div>
        <table class="home">
<td>
        {Data.map(course => {
return (<tr key={course.id}>{console.log(course.id)} {course.name} <button style={{width:'90%',color:'red'}} class="btn btn-primary" onClick={()=>handleDeleteClick(course.id,ans.userId)} >delete</button>  </tr>)
})}
        </td>
         </table>
    </div> 
    );
}
 
export default Stock ;