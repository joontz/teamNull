// App.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from "../components/header"
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import Select from 'react-select'
import courseOptions from '../allcourses';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isGpaToggled, setGpaToggled] = useState(false);
    const [isGtaToggled, setGtaToggled] = useState(false);
    const [selectedMajorOptions, setSelectedMajorOptions] = useState([]);
    const [data, setData] = useState([]);
    const [selectedClasses, setSelectedClassesOptions] = useState([]);
    const gridRef = useRef(null);
    const selectMajorInputRef = useRef();
    const selectClassesInputRef = useRef();

    useEffect(() => {
      fetchData(); // Fetch data when the component mounts
    }, []);

    const [columnDefs] = useState([
      { field: 'firstName', headerName: 'First Name', resizable: true, flex: 1 },
      { field: 'lastName', headerName: 'Last Name', resizable: true, flex: 1 },
      { field: 'collegeEmail', headerName: 'College Email', resizable: true,flex: 1 },
      { field: 'currentMajor', headerName: 'Current Major',resizable: true,flex: 1},
      { field: 'graduatingSemester', headerName: 'Graduating Semester',resizable: true,flex: 1 },
      { field: 'cumulativeGPA',  headerName: 'Cumulative GPA',sortable: true,resizable: true,flex: 1},
      { field: 'hoursCompleted', headerName: 'Hours Completed',sortable: true,resizable: true,flex: 1 },
      { field: 'isGtaCertified', headerName: 'GTA Certified', resizable: true,flex: 1 },
      { field: 'coursesForGrader', headerName: 'Courses for Grader', resizable: true,flex: 1 },
      { field: 'coursesForLabInstructor', headerName: 'Courses for Lab Instructor',resizable: true,flex: 1 },
      { field: 'resume', headerName: 'Resume',resizable: true,flex: 1 }
    ]);

    const majorOptions = [
      { value: 'CS', label: 'CS' },
      { value: 'EE', label: 'EE' },
      { value: 'ECE', label: 'ECE' },
      { value: 'IT', label: 'IT' },
      { value: 'Other', label: 'Other' },
    ];

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

    //Clear Button
    const handleClearButtonClick = () => {
      console.log('Button clicked!');
      setSearchTerm('')
      setGtaToggled(false)
      setSelectedMajorOptions([])
      setGpaToggled(false)
      selectMajorInputRef.current.clearValue();
      selectClassesInputRef.current.clearValue();
    };

    //Filter by Classes
    const handleMultiSelectClassesChange = (selectedOptions) => {
      console.log(selectedOptions)
      setSelectedClassesOptions(selectedOptions);
    };

    const containsClassSearchValue = (dictionary, searchValue) => {
      if (!searchValue) {
        return false
      } 
      const searchValuesArray = searchValue.split(',').map((value) => value.trim());
    
      return Object.values(dictionary).some((item) =>
        searchValuesArray.includes(item.value)
      );
    };

    //Search bar filter
    const handleSearchTermChange = (e) => {
      setSearchTerm(e.target.value);
    };

    //Order by GPA
    const handleGpaToggle = () => {
      setGpaToggled(!isGpaToggled);
    };

    useEffect(() => {
      if (gridRef.current.api) {
        if (isGpaToggled === true) {
          orderByGpa()
        } else {
          gridRef.current.columnApi.resetColumnState();
        }
      }
    }, [isGpaToggled]);

    function orderByGpa() {
      gridRef.current.columnApi.applyColumnState({
        state: [{ colId: 'cumulativeGPA', sort: 'desc' }],
        defaultState: { sort: null },
      });
    }

    //Only show GTA Certified
    const handleGtaToggle = () => {
      setGtaToggled(!isGtaToggled);
    };

    //Current Major filter
    const handleMultiSelectMajorChange = (selectedOptions) => {
      console.log(selectedOptions)
      setSelectedMajorOptions(selectedOptions);
    };
    
    const containsSearchValue = (dictionary, searchValue) => {
      return Object.values(dictionary).some(
        (item) => item.value === searchValue
      );
    };
    
    //AG React Grid state and handling
    //Any time a a filter state is changed tell the grid that its changed
    useEffect(() => {
      if (gridRef.current.api) {
        gridRef.current.api.onFilterChanged();
      }
    }, [searchTerm, isGtaToggled, selectedMajorOptions, selectedClasses]);

    //Filter calls this after onFilterChanged() is called, returns true when a filter is on
    const isExternalFilterPresent = useCallback(() => {
      return searchTerm !== '' || isGtaToggled || selectedMajorOptions.length > 0 || selectedClasses.length > 0; 
    }, [searchTerm, isGtaToggled, selectedMajorOptions, selectedClasses]);
    
    //Iterates through each node (row) and checks if it passes the filter in each return statement
    //Currently explicitly handles every combination of filter, TODO: Refactor and condense
    const doesExternalFilterPass = useCallback(
      (node) => {
        if (node.data) {
          const hasSearchTerm = searchTerm !== '';
          const hasSelectedMajorOptions = selectedMajorOptions.length > 0;
          const hasSelectedClasses = selectedClasses.length > 0;
          const lowerCaseFirstName = node.data.firstName.toLowerCase();
          const lowerCaseSearchTerm = searchTerm.toLowerCase();
          
          if (isGtaToggled && hasSearchTerm && hasSelectedMajorOptions && hasSelectedClasses) {
            return (
              node.data.isGtaCertified === true &&
              lowerCaseFirstName.includes(lowerCaseSearchTerm) &&
              containsSearchValue(selectedMajorOptions, node.data.currentMajor) &&
              (containsClassSearchValue(selectedClasses, node.data.coursesForGrader) || containsClassSearchValue(selectedClasses, node.data.coursesForLabInstructor)) 
            );
          } else if (isGtaToggled && hasSearchTerm && hasSelectedMajorOptions) {
            return (
              node.data.isGtaCertified === true &&
              lowerCaseFirstName.includes(lowerCaseSearchTerm) &&
              containsSearchValue(selectedMajorOptions, node.data.currentMajor)
            );
          } else if (hasSearchTerm && hasSelectedMajorOptions && hasSelectedClasses) {
            return (
              lowerCaseFirstName.includes(lowerCaseSearchTerm) &&
              containsSearchValue(selectedMajorOptions, node.data.currentMajor) &&
              (containsClassSearchValue(selectedClasses, node.data.coursesForGrader) || containsClassSearchValue(selectedClasses, node.data.coursesForLabInstructor)) 
            );
          } else if (isGtaToggled && hasSelectedClasses) {
            return (
              node.data.isGtaCertified === true &&
              (containsClassSearchValue(selectedClasses, node.data.coursesForGrader) || containsClassSearchValue(selectedClasses, node.data.coursesForLabInstructor)) 
            );
          } else if (hasSearchTerm && hasSelectedClasses) {
            return (
              lowerCaseFirstName.includes(lowerCaseSearchTerm) &&
              (containsClassSearchValue(selectedClasses, node.data.coursesForGrader) || containsClassSearchValue(selectedClasses, node.data.coursesForLabInstructor)) 
            );
          } else if (hasSelectedMajorOptions && hasSelectedClasses) {
            return (
              containsSearchValue(selectedMajorOptions, node.data.currentMajor) &&
              (containsClassSearchValue(selectedClasses, node.data.coursesForGrader) || containsClassSearchValue(selectedClasses, node.data.coursesForLabInstructor)) 
            );
          } else if (isGtaToggled && hasSearchTerm) {
            return (
              node.data.isGtaCertified === true &&
              lowerCaseFirstName.includes(lowerCaseSearchTerm)
            );
          } else if (isGtaToggled && hasSelectedMajorOptions) {
            return (
              node.data.isGtaCertified === true &&
              containsSearchValue(selectedMajorOptions, node.data.currentMajor)
            );
          } else if (hasSearchTerm && hasSelectedMajorOptions) {
            return (
              lowerCaseFirstName.includes(lowerCaseSearchTerm) &&
              containsSearchValue(selectedMajorOptions, node.data.currentMajor)
            );
          } else if (isGtaToggled) {
            return node.data.isGtaCertified === true;
          } else if (hasSearchTerm) {
            return lowerCaseFirstName.includes(lowerCaseSearchTerm);
          } else if (hasSelectedMajorOptions) {
            return containsSearchValue(selectedMajorOptions, node.data.currentMajor);
          } else if (hasSelectedClasses) {
            return (containsClassSearchValue(selectedClasses, node.data.coursesForGrader) || containsClassSearchValue(selectedClasses, node.data.coursesForLabInstructor)) ;
          }
        }
        return true;
      },
      [searchTerm, isGtaToggled, selectedMajorOptions, selectedClasses]
    );
    
    
  return (
   <div className='container'>
      <Header/>
      <div className='search-container'>
        <div className='search-options'>
          <div className='select-clear-container' id='item2'>
            <button className='clear-button' onClick={handleClearButtonClick}>Clear Filters</button>
            <Select
              className='select-classes'
              placeholder={<div>Show only selected Classes(s)</div>}
              ref={selectClassesInputRef}
              onChange={handleMultiSelectClassesChange}
              options={courseOptions} 
              isMulti
              menuPosition="fixed"
            />
          </div>
          <input
            id='item3'
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <div className='checkbox-container' id='item4'>
            <label>
              <input
                type="checkbox"
                checked={isGpaToggled}
                onChange={handleGpaToggle}
                />
                Order by Gpa
            </label>
            <label id='item4'>
            <input
              type="checkbox"
              checked={isGtaToggled}
              onChange={handleGtaToggle}
              />
              GTA Certified
            </label>
          </div>
          <Select 
              placeholder={<div>Show only selected Major(s)</div>}
              ref={selectMajorInputRef}
              onChange={handleMultiSelectMajorChange}
              options={majorOptions}  
              isMulti
              menuPosition="fixed"
            />
        </div>
      </div>
      <div className="ag-theme-alpine" style={{ height: 800, width: '98%', column: 'flex'}}>
        <AgGridReact
          ref={gridRef} 
          rowData={data} 
          columnDefs={columnDefs}
          animateRows={true}
          enableCellTextSelection={true}
          isExternalFilterPresent={isExternalFilterPresent}
          doesExternalFilterPass={doesExternalFilterPass}>
        </AgGridReact>
      </div>
      <div>{searchTerm}</div>
      
    </div>
  );
}
