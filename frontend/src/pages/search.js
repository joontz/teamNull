// App.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from "../components/header"
import tablefilter from '../components/tablefilter';
import { useNavigate } from 'react-router-dom';
import "../search.css"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const gridRef = useRef();

    useEffect(() => {
      fetchData(); // Fetch data when the component mounts
    }, []);

    const [rowData] = useState([data]);

    const [columnDefs] = useState([
      { field: 'firstName', headerName: 'First Name', resizable: true, width: 150 },
      { field: 'lastName', headerName: 'Last Name', resizable: true, width: 150 },
      { field: 'collegeEmail', headerName: 'College Email' },
      { 
        field: 'currentMajor', 
        headerName: 'Current Major',
        filter: tablefilter,
        filterParams: {title: 'Major', values: ['CS','IT','ECE']} 
      },
      { field: 'graduatingSemester', headerName: 'Graduating Semester' },
      { 
        field: 'cumulativeGPA', 
        headerName: 'Cumulative GPA', 
        filter: tablefilter, 
        filterParams: {title: 'GPA Filter', values: [4,8], searchTerm: searchTerm}
      },
      { field: 'hoursCompleted', headerName: 'Hours Completed' },
      { field: 'isGtaCertified', headerName: 'GTA Certified', resizable: true, width: 150 },
      { field: 'coursesForLabInstructor', headerName: 'Courses for Lab Instructor', resizable: true },
      { field: 'resume', headerName: 'Resume' },
    ]);

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9000/searchName"); // Update with your actual API endpoint
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    const handleSearchTermChange = (e) => {
      setSearchTerm(e.target.value);
    };
    
  return (
   <div className='container'>
      <Header/>
      <div className='search-options'>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      <div className="ag-theme-alpine" style={{ height: 800, width: '95%', column: 'flex'}}>
        <AgGridReact
          ref={gridRef} 
          rowData={data} 
          columnDefs={columnDefs}
          animateRows={true}>
        </AgGridReact>
      </div>
      <div>{searchTerm}</div>
      
    </div>
  );
}
