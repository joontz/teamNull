// App.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import students from '../images/students.jpg';
import { useNavigate } from "react-router-dom"
import Header from "../components/header"



export default function App() {
  

  return (
    <div className="container">
      <Header />
        
        <img src={students} alt="Your Image Alt Text" className='landing-img' />
        
        <div className='landing-txt-container'>
          <div className='landing-header-txt'> Applying to be a GTA Tutor has never been easier. </div>
          <div className='landing-header-txt'> Make a difference this semester by applying now! </div>
        </div>

        <div className='apply-container'>
          <button className="apply-button"> Apply </button>
        </div>

    </div>
  );
}
