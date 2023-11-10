import React, { Component } from 'react';
import './application-form.css';
import { useNavigate } from "react-router-dom";

//const navigate = useNavigate;
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
            currentMajor: '',
            isGtaCertified: false,
            coursesForGrader: [],
            coursesForLabInstructor: [],
            resume: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value, type } = event.target;

        if (type === 'select-multiple') {
            const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);

            this.setState({
                [name]: selectedOptions,
            });
        } else {
    this.setState({
        [name]: value,
    });
}
    }

    handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            this.setState({ resume: file });
        }
    }

    handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        this.setState({
            [name]: checked
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {navigate} = this.props;
        const currentLevelValue = this.state.currentLevel;
        const graduatingSemesterValue = this.state.graduatingSemester;
        const currentMajorValue = this.state.currentMajor;
        const coursesForGraderValue = this.state.coursesForGrader;
        const coursesForLabInstructorValue = this.state.coursesForLabInstructor;

        // Check if "Select..." is chosen for the dropdown selects
        if (currentLevelValue === "") {
            alert("Please select a different option for your current level of education.");
            return; // Prevent form submission
        }

        if (graduatingSemesterValue === "") {
            alert("Please select a different option for your graduting semester.");
            return; // Prevent form submission
        }

        if (currentMajorValue === "") {
            alert("Please select a different option for your current major.");
            return; // Prevent form submission
        }
        // Ensure that the user has selected at least one class
        if ((coursesForGraderValue.length === 0) && (coursesForLabInstructorValue.length === 0 )) {
            alert("Please select a course that you wish to apply for.");
            return;
        }

        //TODO: @jdsp4k This should be genericized
        fetch("http://localhost:9000/apply", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: this.firstName,
              lastName: this.lastName,
              studentId: this.studentId,
              collegeEmail: this.collegeEmail,
              currentLevel: this.currentLevel,
              graduatingSemester: this.graduatingSemester,
              cumulativeGPA: this.cumulativeGPA,
              hoursCompleted: this.hoursCompleted,
              undergraduateDegree: this.undergraduateDegree,
              currentMajor: this.currentMajor,
              applyingFor: this.applyingFor,
              isGtaCertified: this.isGtaCertified,
              coursesForLabInstructor: this.coursesForLabInstructor,
            }),
          })      
          .then((res) => {
            if (res.status === 200) {
              alert("Application submitted");
              navigate('/dashboard')
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
        //console.log(this.state);
        // Handle form submission here, send data to the server
        console.log(this.state);
    }


    render() {
        return (               
                    
                    <div className='application-container'>
                        <form onSubmit={this.handleSubmit} className='applicationBox'>
                       
                            
                            <div className='row'>
                                <div className='prompt-column'>
                                    <div className="inputPrompt">First Name:</div>
                                    <input type="text" name="firstName" required value={this.state.firstName} onChange={this.handleInputChange} />
                                </div>
                            

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Last Name:</div>
                            <input type="text" name="lastName" required value={this.state.lastName} onChange={this.handleInputChange} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='prompt-column'>
                                    <div className="inputPrompt">Student ID:</div>
                            <input type="number" min="0" step="" name="studentId" required value={this.state.studentId} onChange={this.handleInputChange} />
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">College Email:</div>
                            <input type="email" name="collegeEmail" required value={this.state.collegeEmail} onChange={this.handleInputChange} />
                                </div>
                            </div>
                            
                                <div className='prompt-column'>
                                    <div className="inputPrompt">Current Level:</div>
                            <select name="currentLevel" value={this.state.currentLevel} onChange={this.handleInputChange}>
                            <option value="">select...</option>
                            <option value="BS">BS</option>
                            <option value="MS">MS</option>
                            <option value="PHD">PHD</option>
                        </select>
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Graduating Semester:</div>
                        <select name="graduatingSemester" value={this.state.graduatingSemester} onChange={this.handleInputChange}>
                            <option value="">select...</option>
                            <option value="fall 2023">2023 Fall</option>
                            <option value="spring 2024">2024 Spring</option>
                            <option value="fall 2024">2024 Fall</option>
                            <option value="spring 2025">2025 Spring</option>
                            <option value="fall 2025">2025 Fall</option>
                            <option value="spring 2026">2026 Spring</option>
                            <option value="fall 2026">2026 Fall</option>
                            </select>
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Cumulative GPA:</div>
                        <input type="number" step="0.01" min="0" name="cumulativeGPA" required value={this.state.cumulativeGPA} onChange={this.handleInputChange} />
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Hours Completed:</div>
                        <input type="number" name="hoursCompleted" required value={this.state.hoursCompleted} onChange={this.handleInputChange} />
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Current Major:</div>
                        <select name="currentMajor" value={this.state.currentMajor} onChange={this.handleInputChange}>
                            <option value="">select...</option>
                            <option value="CS">CS</option>
                            <option value="ECE">ECE</option>
                            <option value="EE">EE</option>
                            <option value="IT">IT</option>
                            <option value="other">other</option>
                            </select>
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Are you GTA Certified? (International students only):</div>
                                    <input type="checkbox" name="isGtaCertified" checked={this.state.isGtaCertified} onChange={this.handleCheckboxChange} />
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Courses you could serve as a grader for: (ctrl + click to select multiple)</div>
                        <select name="coursesForGrader" multiple class="multi-select" value={this.state.coursesForGrader} onChange={this.handleInputChange}>
                            <option value="CS 101">CS 101</option>
                            <option value="CS 191">CS 191</option>
                            <option value="CS 201R">CS 201R</option>
                            <option value="CS 291">CS 291</option>
                            <option value="CS 303">CS 303</option>
                            <option value="CS 320">CS 320</option>
                            <option value="CS 349">CS 349</option>
                            <option value="CS 394R">CS 394R</option>
                            <option value="CS 404">CS 404</option>
                            <option value="CS 441">CS 441</option>
                            <option value="CS 449">CS 449</option>
                            <option value="CS 456">CS 456</option>
                            <option value="CS 457">CS 457</option>
                            <option value="CS 458">CS 458</option>
                            <option value="CS 461">CS 461</option>
                            <option value="CS 465R">CS 465R</option>
                            <option value="CS 470">CS 470</option>
                            <option value="CS 5520">CS 5520</option>
                            <option value="CS 5525">CS 5525</option>
                            <option value="CS 5552A">CS 5552A</option>
                            <option value="CS 5565">CS 5565</option>
                            <option value="CS 5573">CS 5573</option>
                            <option value="CS 5590PA">CS 5590PA</option>
                            <option value="CS 5592">CS 5592</option>
                            <option value="CS 5596A">CS 5596A</option>
                            <option value="CS 5596B">CS 5596B</option>
                            <option value="ECE 216">ECE 216</option>
                            <option value="ECE 226">ECE 226</option>
                            <option value="ECE 228">ECE 228</option>
                            <option value="ECE 241">ECE 241</option>
                            <option value="ECE 276">ECE 276</option>
                            <option value="ECE 302">ECE 302</option>
                            <option value="ECE 330">ECE 330</option>
                            <option value="ECE 341R">ECE 341R</option>
                            <option value="ECE 428R">ECE 428R</option>
                            <option value="ECE 458">ECE 458</option>
                            <option value="ECE 466">ECE 466</option>
                            <option value="ECE 477">ECE 477</option>
                            <option value="ECE 486">ECE 486</option>
                            <option value="ECE 5558">ECE 5558</option>
                            <option value="ECE 5560">ECE 5560</option>
                            <option value="ECE 5567">ECE 5567</option>
                            <option value="ECE 5577">ECE 5577</option>
                            <option value="ECE 5578">ECE 5578</option>
                            <option value="ECE 5586">ECE 5586</option>
                            <option value="IT 222">IT 222</option>
                            <option value="IT 321">IT 321</option>
                                    </select>
                    </div>

                    <div className='prompt-column'>
                        <div className="inputPrompt">Courses you could serve as a lab instructor for: (ctrl + click to select multiple)</div>
                        <select name="coursesForLabInstructor" multiple class="multi-select" value={this.state.coursesForLabInstructor} onChange={this.handleInputChange}>
                            <option value="CS 101L">CS 101L</option>
                            <option value="CS 201L">CS 201L</option>
                            <option value="CS 227">ECE 227</option>
                            <option value="CS 229">ECE 229</option>
                            <option value="CS 277">ECE 277</option>
                            <option value="CS 303">ECE 303</option>
                            <option value="CS 377">ECE 377</option>
                            <option value="CS 331">ECE 331</option>
                            <option value="CS 427">ECE 427</option>
                            <option value="CS 429">ECE 429</option>
                            </select>
                    </div>

                    <div className='prompt-column'>
                        <div className="inputPrompt">Upload Resume:</div>
                        <input
                            type="file"
                            name="resume"
                            accept=".pdf, .doc, .docx"
                        onChange={this.handleFileUpload}/>
                    </div>

                                <div className='prompt-column'>
                                    <button type="submit" class='submit-button'>Submit</button>
                    </div>  
                </form>
        </div>
               
        );
    }
}
