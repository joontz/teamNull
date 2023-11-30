// App.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import Header from "../components/header"
import ApplicationForm from '../components/application-form.component';



export default function Apply(props) {
  const [graderCourses, setGraderCourses] = useState([]);
  const [labCourses, setLabCourses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const {course} = location.state || {};

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9000/courses");
        const result = await response.json();
        setGraderCourses( result
          .filter(item => item.isLabCourse === false)
          .map(item => ({ value: item.courseAbbrev, label: item.courseAbbrev })));
        setLabCourses( result
          .filter(item => item.isLabCourse === true)
          .map(item => ({ value: item.courseAbbrev, label: item.courseAbbrev })));
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className='container'>
      <Header></Header>
      <div style={{height: '20px'}}></div>
        <ApplicationForm {...props} navigate={navigate} availableCourses={graderCourses} availableLabCourses={labCourses} selectedCourse={course}></ApplicationForm>
      <div style={{height: '20px'}}></div>
    </div>
  );
}
