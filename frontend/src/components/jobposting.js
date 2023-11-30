import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




export default function App() {
    const [data, setData] = useState([]);
    const navigate = useNavigate()

    const goToApply = (course) => {
        // navigate to apply page, pass in courseId
        // see this https://reactrouter.com/en/main/hooks/use-navigate#optionsstate
        navigate("/apply", { state: { course: course } });
    }
    
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

    return (
<div  className='posting-row'>
    {data.map((item) => (
        <div className='posting-box'>
            <div className='title-row'>
                <div className='title'>{item.courseTitle}</div>
                <div className='description'>{item.courseAbbrev}</div>
            </div>
            <button className='button' onClick={() => {
                goToApply([item.courseAbbrev, item.isLabCourse])
            }}>Apply</button>
        </div>
    ))}
    </div>
    )
        };