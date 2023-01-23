
import React from 'react'
import {useState,useContext,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pop from '../images/logo-og.jpg'


const Stock = (props) => {
    const[Data,setData]=useState([])
    const[name,setname]=useState([])

const token=localStorage.getItem('e-mail')
console.log(token);

async function getData(){
    const hello = await axios.get(`http://localhost:3200/api/courses/${token}`,name);
    const id= hello.data[0].id
    console.log(id);
    const courses=await axios.get(`http://localhost:3200/api/courses/${token}/${id}`);setData(courses.data)
    console.log(courses.data);
}

    useEffect(()=>{
        getData() 
    },[])

    return ( 
    <div>
        <table class="home">
<td>
        {Data.map(course => {
return (<tr key={course.id}>{course.name} <button style={{width:'90%',color:'red'}} class="btn btn-primary">delete</button></tr>)
})}
        </td>
         </table>
    </div> 
    );
}
 
export default Stock ;