import React, { useState } from "react";
import "../App.css";

export default function AddCourse() {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseAbbrev, setCourseAbbrev] = useState('');
  const [isLabCourse, setLabToggle] = useState(false);

  const handleCourseTitleChange = (e) => {
    setCourseTitle(e.target.value);
  };

  const handleCourseAbbrevChange = (e) => {
    setCourseAbbrev(e.target.value);
  };

  const handleLabToggle = () => {
    setLabToggle(!isLabCourse);
  };

  const addNewCourse = (event) => {
    event.preventDefault();

        if (courseTitle === "" || courseAbbrev === "") {
            alert("Please fill in both course title and abbreviation");
            return; 
        }

        fetch("http://localhost:9000/addCourse", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              courseTitle: courseTitle,
              courseAbbrev: courseAbbrev,
              isLabCourse: isLabCourse,
              }),
          })      
          .then((res) => {
            if (res.status === 200) {
              alert("Course submitted");
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

          window.location.reload();

  };

  return (
        <div className="add-course-container">
          <label style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold'}}>Add a new course</label>
          <div className="add-course-pair">
            <label>
              Course Title
            </label>
            <input
              value={courseTitle}
              onChange={handleCourseTitleChange}
              >
            </input>
          </div>
          <div className="add-course-pair">
            <label>
              Course Abbreviation
            </label>
            <input
              value={courseAbbrev}
              onChange={handleCourseAbbrevChange}
              >
            </input>
          </div>
          <div className="add-course-pair">
            <label className="is-lab-label">
              Is this a lab course?
            </label>
            <input
              type="checkbox"
              onClick={handleLabToggle}
              >
            </input>
          </div>
          <button onClick={addNewCourse}>Add Course</button>
        </div>
  );
}
