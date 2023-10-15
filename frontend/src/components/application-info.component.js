// App.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import students from '../images/students.jpg';
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import './application-form.css';



export default function ApplicationInfo() {
  return (
                    <div className="box1">
                        <div className='text-header'>Please read all 15 requirements before applying</div>
                        <div className='text-items'>
                            1) You must be GTA certified to work as a lab instructor. More information on the certification process can be
                            found <a href="https://catalog.umkc.edu/general-graduate-academic-regulations-information/international-
                            graduate-student-academic-regulations/">here</a>. If you have questions, please contact the School of Graduate Studies
                            at umkcsgs@umkc.edu or 816-235-1301.
                        </div>
                        <div className='text-items'>2) If you are not GTA certified, you may only apply for Grader positions.</div>
                        <div className='text-items'>3) GTA certification for international students can only be waived with a previous degree from a US institute.</div>
                        <div className='text-items'>4) International F-1 students are limited to 20 hours/week and domestic students/PR card holders are limited to 28
                            hours/week.
                        </div>
                        <div className='text-items'>5) We ARE NOT hiring for any instructor positions at this time.</div>
                        <div className='text-items'>6) These are the courses that, potentially, need graders: CS 101; CS 191; CS 201R; CS 291; CS 303; CS 320; CS 349; CS
                            394R; CS 404; CS 441, CS 449; CS 456; CS 457; CS 458; CS 461; CS 465R; CS 470; CS 5520; CS 5525; CS 5552A; CS
                            5565; CS 5573; CS 5590PA; CS 5592; CS 5596A; CS 5596B; ECE 216; ECE 226; ECE 228; ECE 241; ECE 276; ECE 302;
                            ECE 330; ECE 341R; ECE 428R; ECE 458; ECE 466; ECE 477; ECE 486; ECE 5558; ECE 5560; ECE 5567; ECE 5577; ECE
                            5578; ECE 5586; IT 222; IT 321
                        </div>
                        <div className='text-items'>7) Undergraduates: You may only apply to be a grader for a course you have taken at UMKC.</div>
                        <div className='text-items'>8) Master's Students: You may only apply to be a grader for undergraduate courses you took during your,
                            previous, course of study. You may only apply to grade for graduate-level classes you have taken at UMKC
                            (and received a satisfactory grade of an A, A- or B+).
                        </div>
                        <div className='text-items'>9) PhD Students: You may be considered as a grader for any class, based on feedback from your advisor.</div>
                        <div className='text-items'>10) These are the courses that, potentially, need lab instructors: CS 101L; CS 201L, ECE 227; ECE 229; ECE 277; ECE
                            303; ECE 377; ECE 331; ECE 427; ECE 429
                        </div>
                        <div className='text-items'>11) Please do not include any courses not mentioned, above in your application as this will not help your
                            potential employment.
                        </div>
                        <div className='text-items'>12) Descriptions for the above-mentioned courses can be found, here:
                            https://catalog.umkc.edu/course-offerings/
                        </div>
                        <div className='text-items'>13) DO NOT include a copy of a CV/resume, cover letter or reference letters as that will not help your
                            potential employment.
                        </div>
                        <div className='text-items'>14) Please do not, openly, solicit for employment outside of this hiring period as we do not keep
                            resumes/CVs on file
                        </div>
                        <div className='text-items'>15) All positions will be chosen by November 1st. If you have not heard from anyone in the CSEE Department by
                            November 1st, you were not chosen for a position.
                        </div>


                        
                    </div>
  )}