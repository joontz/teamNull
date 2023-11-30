import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../App.css";

export default function ViewCourse() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const gridRef = useRef(null);

  const [columnDefs] = useState([
    { field: 'courseTitle', headerName: 'Course Title', resizable: true, flex: 1 },
    { field: 'courseAbbrev', headerName: 'Course Abbrev', resizable: true, flex: 1 },
    { field: 'isLabCourse', headerName: 'Lab Course?', resizable: true, flex: 1 }
  ]);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:9000/courses");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const removeCourse = async (row) => {
    console.log(row)
    console.log(row[0].courseTitle)
    fetch("http://localhost:9000/removeCourse", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                coursesToDelete: row,
              }),
          })      
          .then((res) => {
            console.log(res.status);
            console.log(res.headers);
            if (res.status === 200) {
              alert("Course Removed");
            } else {
              alert(res.status);
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch((err) => {
            console.error(err);
            //setError("");
          });
    };

  //Search bar filter
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //AG React Grid state and handling
    //Any time a a filter state is changed tell the grid that its changed
    useEffect(() => {
        if (gridRef.current.api) {
          gridRef.current.api.onFilterChanged();
        }
      }, [searchTerm]);
  
      //Filter calls this after onFilterChanged() is called, returns true when a filter is on
      const isExternalFilterPresent = useCallback(() => {
        return searchTerm !== ''; 
      }, [searchTerm]);
      
      //Iterates through each node (row) and checks if it passes the filter in each return statement
      const doesExternalFilterPass = useCallback(
        (node) => {
          if (node.data) {
            const lowerCaseCourseTitle = node.data.courseTitle.toLowerCase().replace(/\s/g, '');
            const lowerCaseCourseAbbrev = node.data.courseAbbrev.toLowerCase().replace(/\s/g, '');
            const lowerCaseSearchTerm = searchTerm.toLowerCase();

            return lowerCaseCourseTitle.includes(lowerCaseSearchTerm) || lowerCaseCourseAbbrev.includes(lowerCaseSearchTerm);
          }
          return true;
        },
        [searchTerm]
      );

    const onRemoveSelected = useCallback(() => {
        const selectedData = gridRef.current.api.getSelectedRows();
        if (selectedData.length === 0) {
            return
        }
        console.log('selectedData:', selectedData)
        removeCourse(selectedData);
        const res = gridRef.current.api.applyTransaction({ remove: selectedData });
    }, []);

  return (
        <div className="courses-container">
            <div className="search-remove-options">
                <input
                    className="course-search-bar"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <button
                    className="course-search-bar"
                    onClick={onRemoveSelected}
                >Remove Selected Course(s)</button>
            </div>
            <div className="ag-theme-alpine" style={{ height: 800, width: '92%', height: '600px', column: 'flex', marginLeft: '5%'}}>
                <AgGridReact
                    ref={gridRef} 
                    rowData={data} 
                    columnDefs={columnDefs}
                    rowSelection={'multiple'}
                    animateRows={true}
                    enableCellTextSelection={true}
                    isExternalFilterPresent={isExternalFilterPresent}
                    doesExternalFilterPass={doesExternalFilterPass}
                >
                </AgGridReact>
            </div>
        </div>
  );
}
