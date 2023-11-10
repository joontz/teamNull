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
        const {navigate} = this.props;
        // Handle form submission here, send data to the server
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
    }

    render() {
        return (
         
                
                    
                    <div className='application-container'>
                        <form onSubmit={this.handleSubmit} className='applicationBox'>
                       
                            
                            <div className='row'>
                                <div className='prompt-column'>
                                    <div className="inputPrompt">First Name:</div>
                                    <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
                                </div>
                            

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Last Name:</div>
                                    <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='prompt-column'>
                                    <div className="inputPrompt">Student ID:</div>
                                    <input type="text" name="studentId" value={this.state.studentId} onChange={this.handleInputChange} />
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">College Email:</div>
                                    <input type="email" name="collegeEmail" value={this.state.collegeEmail} onChange={this.handleInputChange} />
                                </div>
                            </div>
                            
                                <div className='prompt-column'>
                                    <div className="inputPrompt">Current Level (BS/MS/PhD):</div>
                                    <input type="text" name="currentLevel" value={this.state.currentLevel} onChange={this.handleInputChange} />
                                </div>

                               


                                <div className='prompt-column'>
                                    <div className="inputPrompt">Graduating Semester:</div>
                                    <input type="text" name="graduatingSemester" value={this.state.graduatingSemester} onChange={this.handleInputChange} />
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Cumulative GPA:</div>
                                    <input type="number" name="cumulativeGPA" value={this.state.cumulativeGPA} onChange={this.handleInputChange} />
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Hours Completed:</div>
                                    <input type="number" name="hoursCompleted" value={this.state.hoursCompleted} onChange={this.handleInputChange} />
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Undergraduate Degree:</div>
                                    <input type="text" name="undergraduateDegree" value={this.state.undergraduateDegree} onChange={this.handleInputChange} />
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Current Major:</div>
                                    <input type="text" name="currentMajor" value={this.state.currentMajor} onChange={this.handleInputChange} />
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Applying For (Grader, Lab instructor, or both):</div>
                                    <select name="applyingFor" value={this.state.applyingFor} onChange={this.handleInputChange}>
                                        <option value="">Select...</option>
                                        <option value="Grader">Grader</option>
                                        <option value="Lab instructor">Lab instructor</option>
                                        <option value="Both">Both</option>
                                    </select>
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Are you GTA Certified? (International students only):</div>
                                    <input type="checkbox" name="isGtaCertified" checked={this.state.isGtaCertified} onChange={this.handleCheckboxChange} />
                                </div>

                                <div className='prompt-column'>
                                    <div className="inputPrompt">Courses you could serve as a lab instructor or a grader for:</div>
                                    <textarea name="coursesForLabInstructor" value={this.state.coursesForLabInstructor} onChange={this.handleInputChange} />
                                </div>

                                <div className='prompt-column'>
                                    <button type="submit">Submit</button>
                                </div>  

                        </form>
                        </div>
               
        );
    }
}
