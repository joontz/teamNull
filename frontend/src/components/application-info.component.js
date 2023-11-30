// App.js
import React, { useState  } from 'react';
import '../App.css';
import './application-form.css';
import Accordion from './accordion'

const accordionData = [
    {
        title: 'What courses can I apply for?',
        content: 'Available courses can be found on the home page and are updated every semester based on class sizes and need.',
    },
    {
        title: 'How many courses can I apply for?',
        content: 'Apply for any course that you feel confident in, you may apply for any number of courses.',
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
    },
    {
        title: 'Equal Opportunity Statement',
        content: 'We are committed to providing equal opportunities to all applicants and employees, regardless of race, color, religion, sex, national origin, age, disability, or any other characteristic protected by law. Our hiring and employment decisions are based on merit, qualifications, and campus needs.'
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