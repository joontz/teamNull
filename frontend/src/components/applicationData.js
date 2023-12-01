import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import "../App.css";

export default function ApplicationData() {
  const [data, setData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [labCourseData, setLabCourseData] = useState([]);
  const [count, setCount] = useState(0);
  const [graderCount, setGraderCount] = useState(0);
  const [labCount, setlabCount] = useState(0);


  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:9000/applications"); 
      const result = await response.json();
      console.log(result)

      let total = 0;
      let graderTotal = 0;
      let labTotal = 0;
      const courses = [['Total','Number of Applicants']];
      const labCourses = [['Total','Number of Applicants']];
      result.forEach((object, index) => {
        const coursesForGrader = object.coursesForGrader.split(', ');
        const coursesForLabInstructor = object.coursesForLabInstructor.split(', ');
        
        total += 1;
        coursesForGrader.forEach(course => {
          if (course.trim() === '') {
            return;
          }
          const existingCourseIndex = courses.findIndex(item => item[0] === course);
          graderTotal += 1;
          if (existingCourseIndex !== -1) {
            if (courses[existingCourseIndex][0] === '') {
              return
            }
            courses[existingCourseIndex][1] += 1;
          } else {
            courses.push([course, 1]);
          }
        });

        coursesForLabInstructor.forEach(course => {
          if (course.trim() === '') {
            return;
          }

          labTotal += 1;
          const existingCourseIndex = labCourses.findIndex(item => item[0] === course);
          if (existingCourseIndex !== -1) {
            if (labCourses[existingCourseIndex][0] === '') {
              return
            }
            labCourses[existingCourseIndex][1] += 1;
          } else {
            labCourses.push([course, 1]);
          }
        });

      });

      setCourseData(courses);
      setLabCourseData(labCourses);
      setCount(total);
      setGraderCount(graderTotal);
      setlabCount(labTotal);
    } catch (error) {
      console.error(error);
    }
  };


  const courseOptions = {
    title: "Grader Application Count",
    chartArea: { width: "70%" },
    hAxis: {
      title: "Total Applicants",
      minValue: 0,
    },
    vAxis: {
      title: "Count",
      format: '0',
    },
  };

  const labCourseOptions = {
    title: "Lab Instructor Application Count",
    chartArea: { width: "70%" },
    hAxis: {
      title: "Total Applicants",
      minValue: 0,
    },
    vAxis: {
      title: "Count",
      format: '0',
    },
    colors:['gold']
  };
        


  return (
        <div className="app-data-container">
            <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', margin: '20px' }}>
              {`A total of ${count} students have applied for ${graderCount} grader courses and ${labCount} lab courses!`}
            </div>
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={courseData}
              options={courseOptions}
            />
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={labCourseData}
              options={labCourseOptions}
            />
        </div>
  );
}
