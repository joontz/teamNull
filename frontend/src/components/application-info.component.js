// App.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import students from '../images/students.jpg';
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import './application-form.css';
import Accordion from './accordion'

const accordionData = [
    {
        title: 'What courses can I apply for?',
        content: 'Available courses can be found on the home page and are updated every semester based on class sizes and need.',
    },
    {
        title: 'Do I need to be GTA certified?',
        content: 'If you are not GTA certified, you may only apply for Grader positions.',
    },
    {
        title: 'How long does the application period last?',
        content: 'All positions will be chosen by November 1st. If you have not heard from anyone in the CSEE Department by November 1st, you were not chosen for a position.',
    },
    {
        title: 'Undergraduate students',
        content: 'You may only apply to be a grader for a course you have taken at UMKC.',
    },
    {
        title: 'Master students',
        content: 'You may only apply to be a grader for undergraduate courses you took during your, previous, course of study. You may only apply to grade for graduate-level classes you have taken at UMKC (and received a satisfactory grade of an A, A- or B+)',
    },
    {
        title: 'PhD students',
        content: 'You may be considered as a grader for any class, based on feedback from your advisor.',
    }
]

export default function ApplicationInfo() {
    const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
   <div className='accordion-box'>
    <Accordion sections={accordionData}/>
   </div>
  )}