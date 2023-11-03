import { useState } from 'react';
import '../App.css';
import COURSES from '../courses';
import { useNavigate } from 'react-router-dom';




export default function App() {
    const navigate = useNavigate()

    const goToApply = (courseId) => {
        // navigate to apply page, pass in courseId
        // see this https://reactrouter.com/en/main/hooks/use-navigate#optionsstate
        navigate("/apply", { state: { courseId: courseId } });
    }
 
    return (
<div  className='posting-row'>
    {Object.keys(COURSES).map((courseId) => (
        <div className='posting-box'>
            <div className='title-row'>
                <div className='title'>{COURSES[courseId].title}</div>
                <div className='description'>{COURSES[courseId].description}</div>
            </div>
            <button className='button' onClick={() => {
                goToApply(courseId)
            }}>Apply</button>
        </div>
    ))}
    </div>
    )
        };