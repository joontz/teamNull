// App.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import students from '../images/students.jpg';
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import ApplicationForm from '../components/application-form.component';
import ApplicationInfo from '../components/application-info.component';



export default function Apply(props) {
  
  const navigate = useNavigate();

  return (
    <div className='container'>
      <Header></Header>
        <ApplicationForm {...props} navigate={navigate}></ApplicationForm>
    </div>
  );
}
