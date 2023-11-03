// App.js
import React, { useState, useEffect } from 'react';
import students from '../images/students.jpg';
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import "../search.css"
import {Applications} from "../components/applications"
import Table from "../components/Table.js"


export default function Search() {
    const [query, setQuery] = useState('')

    const keys = ['first_name','last_name','email']

    console.log(Applications[0])

    const search = (data)=>{
        return data.filter(
            (item) =>
            keys.some(key=>item[key].toLowerCase().includes(query))
         );
    };
    
  return (
   <div className='container'>
      <Header/>
        <div className='app'>
             <input type='text' 
             placeholder='Search...' 
             className='search' 
             onChange={e=> setQuery(e.target.value)}/>
             <Table data={search(Applications)}/>
             
        </div>
    </div>
  );
}
