import React, { Component } from 'react';
import './application-form.css';

export default class ApplicationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            studentId: '',
            collegeEmail: '',
            currentLevel: '',
            graduatingSemester: '',
            cumulativeGPA: '',
            hoursCompleted: '',
            undergraduateDegree: '',
            currentMajor: '',
            applyingFor: '',
            isGtaCertified: false,
            coursesForLabInstructor: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        this.setState({
            [name]: checked
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here, send data to the server
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <meta charset="UTF-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <link rel="stylesheet" type="text/css" href="application-form.css"></link>
                <title>Your Application Form</title>

                <div id="applicationPage">

                    <div id="box1">
                        Information page
                        <p></p>
                        <div>
                            <li>You must be GTA certified to work as a lab instructor. More information on the certification process can be
                                found <a href="https://catalog.umkc.edu/general-graduate-academic-regulations-information/international-
                                graduate-student-academic-regulations/">here</a>. If you have questions, please contact the School of Graduate Studies
                                at umkcsgs@umkc.edu or 816-235-1301.</li>
                            <li>If you are not GTA certified, you may only apply for Grader positions.</li>
                            <li>GTA certification for international students can only be waived with a previous degree from a US institute.</li>
                            <li>International F-1 students are limited to 20 hours/week and domestic students/PR card holders are limited to 28
                                hours/week.</li>
                            <li>We ARE NOT hiring for any instructor positions at this time.</li>
                            <li>These are the courses that, potentially, need graders: CS 101; CS 191; CS 201R; CS 291; CS 303; CS 320; CS 349; CS
                                394R; CS 404; CS 441, CS 449; CS 456; CS 457; CS 458; CS 461; CS 465R; CS 470; CS 5520; CS 5525; CS 5552A; CS
                                5565; CS 5573; CS 5590PA; CS 5592; CS 5596A; CS 5596B; ECE 216; ECE 226; ECE 228; ECE 241; ECE 276; ECE 302;
                                ECE 330; ECE 341R; ECE 428R; ECE 458; ECE 466; ECE 477; ECE 486; ECE 5558; ECE 5560; ECE 5567; ECE 5577; ECE
                                5578; ECE 5586; IT 222; IT 321</li>
                            <li>Undergraduates: You may only apply to be a grader for a course you have taken at UMKC.</li>
                            <li>Master's Students: You may only apply to be a grader for undergraduate courses you took during your,
                                previous, course of study. You may only apply to grade for graduate-level classes you have taken at UMKC
                                (and received a satisfactory grade of an A, A- or B+).</li>
                            <li>PhD Students: You may be considered as a grader for any class, based on feedback from your advisor.</li>
                            <li>These are the courses that, potentially, need lab instructors: CS 101L; CS 201L, ECE 227; ECE 229; ECE 277; ECE
                                303; ECE 377; ECE 331; ECE 427; ECE 429</li>
                            <li>Please do not include any courses not mentioned, above in your application as this will not help your
                                potential employment.</li>
                            <li>Descriptions for the above-mentioned courses can be found, here:
                                https://catalog.umkc.edu/course-offerings/</li>
                            <li>DO NOT include a copy of a CV/resume, cover letter or reference letters as that will not help your
                                potential employment.</li>
                            <li>Please do not, openly, solicit for employment outside of this hiring period as we do not keep
                                resumes/CVs on file</li>
                            <li>All positions will be chosen by November 1st. If you have not heard from anyone in the CSEE Department by
                                November 1st, you were not chosen for a position.</li>


                        </div>
                    </div>

                    <div id="applicationBox">
                        <form onSubmit={this.handleSubmit}>
                        <div id="form">
                        <div id="promptColumn">
                            <label>
                                <div id="inputPrompt">First Name:</div>
                                <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
                            </label><br />

                            <label>
                                <div id="inputPrompt">Last Name:</div>
                                <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
                            </label><br />

                            <label>
                                <div id="inputPrompt">Student ID:</div>
                                <input type="text" name="studentId" value={this.state.studentId} onChange={this.handleInputChange} />
                            </label><br />

                            <label>
                                <div id="inputPrompt">College Email:</div>
                                <input type="email" name="collegeEmail" value={this.state.collegeEmail} onChange={this.handleInputChange} />
                            </label><br />

                            <label>
                                <div id="inputPrompt">Current Level (BS/MS/PhD):</div>
                                <input type="text" name="currentLevel" value={this.state.currentLevel} onChange={this.handleInputChange} />
                            </label><br />

                            </div>
                            <div id="promptColumn">


                            <label>
                                <div id="inputPrompt">Graduating Semester:</div>
                                <input type="text" name="graduatingSemester" value={this.state.graduatingSemester} onChange={this.handleInputChange} />
                            </label><br />

                            <label>
                                <div id="inputPrompt">Cumulative GPA:</div>
                                <input type="number" name="cumulativeGPA" value={this.state.cumulativeGPA} onChange={this.handleInputChange} />
                            </label><br />

                            <label>
                                <div id="inputPrompt">Hours Completed:</div>
                                <input type="number" name="hoursCompleted" value={this.state.hoursCompleted} onChange={this.handleInputChange} />
                            </label><br />

                            <label>
                                <div id="inputPrompt">Undergraduate Degree:</div>
                                <input type="text" name="undergraduateDegree" value={this.state.undergraduateDegree} onChange={this.handleInputChange} />
                            </label><br />

                            <label>
                                <div id="inputPrompt">Current Major:</div>
                                <input type="text" name="currentMajor" value={this.state.currentMajor} onChange={this.handleInputChange} />
                            </label><br />

                            <label>
                                <div id="inputPrompt">Applying For (Grader, Lab instructor, or both):</div>
                                <select name="applyingFor" value={this.state.applyingFor} onChange={this.handleInputChange}>
                                    <option value="">Select...</option>
                                    <option value="Grader">Grader</option>
                                    <option value="Lab instructor">Lab instructor</option>
                                    <option value="Both">Both</option>
                                </select>
                            </label><br />

                            <label>
                                <div id="inputPrompt">Are you GTA Certified? (International students only):</div>
                                <input type="checkbox" name="isGtaCertified" checked={this.state.isGtaCertified} onChange={this.handleCheckboxChange} />
                            </label><br />

                            <label>
                                <div id="inputPrompt">Courses you could serve as a lab instructor or a grader for:</div>
                                <textarea name="coursesForLabInstructor" value={this.state.coursesForLabInstructor} onChange={this.handleInputChange} />
                                    </label><br />
                                    <button type="submit">Submit</button>
                            </div>

                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
