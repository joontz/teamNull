import React, { Component } from 'react';
import './application-form.css';
import Select from 'react-select';

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
      resume: '',
      availableCourses: props.graderCourses,
      availableLabCourses: props.labCourses,
      selectedCourse: props.selectedCourse,
    };
  }

  componentDidMount() {
    if (this.state.selectedCourse) {
      if (this.state.selectedCourse[1] === true) {
        this.state.coursesForLabInstructor = [
          {
            value: this.state.selectedCourse[0],
            label: this.state.selectedCourse[0],
          },
        ];
      } else {
        this.state.coursesForGrader = [
          {
            value: this.state.selectedCourse[0],
            label: this.state.selectedCourse[0],
          },
        ];
      }
    }
  }

  handleGraderInputChange = (selectedOptions, actionMeta) => {
    const { name } = actionMeta;
    this.setState({
      [name]: selectedOptions,
    });
    console.log('coursesForgrader', this.state.coursesForGrader);
  };

  handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === 'select-multiple') {
      const selectedOptions = Array.from(event.target.selectedOptions).map(
        (option) => option.value
      );
      this.setState({
        [name]: selectedOptions,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ resume: file });
    }
  };

  handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    this.setState({
      [name]: checked,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { navigate } = this.props;
    const currentLevelValue = this.state.currentLevel;
    const graduatingSemesterValue = this.state.graduatingSemester;
    const currentMajorValue = this.state.currentMajor;
    const coursesForGraderValue = this.state.coursesForGrader;
    const coursesForLabInstructorValue = this.state.coursesForLabInstructor;

    // Check if "Select..." is chosen for the dropdown selects
    if (currentLevelValue === '') {
      alert(
        'Please select a different option for your current level of education.'
      );
      return; // Prevent form submission
    }

    if (graduatingSemesterValue === '') {
      alert('Please select a different option for your graduting semester.');
      return; // Prevent form submission
    }

    if (currentMajorValue === '') {
      alert('Please select a different option for your current major.');
      return; // Prevent form submission
    }
    // Ensure that the user has selected at least one class
    if (
      coursesForGraderValue.length === 0 &&
      coursesForLabInstructorValue.length === 0
    ) {
      alert('Please select a course that you wish to apply for.');
      return;
    }

    const stringCoursesForLabInstructor = this.state.coursesForLabInstructor
      .map((course) => `${course.value}`)
      .join(', ');
    const stringCoursesForGrader = this.state.coursesForGrader
      .map((course) => `${course.value}`)
      .join(', ');

    //TODO: @jdsp4k This should be genericized
    fetch('http://localhost:9000/apply', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        studentId: this.state.studentId,
        collegeEmail: this.state.collegeEmail,
        currentLevel: this.state.currentLevel,
        graduatingSemester: this.state.graduatingSemester,
        cumulativeGPA: this.state.cumulativeGPA,
        hoursCompleted: this.state.hoursCompleted,
        undergraduateDegree: this.state.undergraduateDegree,
        currentMajor: this.state.currentMajor,
        applyingFor: this.state.applyingFor,
        isGtaCertified: this.state.isGtaCertified,
        coursesForGrader: stringCoursesForGrader,
        coursesForLabInstructor: stringCoursesForLabInstructor,
        resume: this.state.resume,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Application submitted');
          navigate('/dashboard');
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
  };

  render() {
    return (
      <div className="application-container">
        <form onSubmit={this.handleSubmit} className="applicationBox">
          <div className="row">
            <div className="prompt-column">
              <div className="inputPrompt">First Name:</div>
              <input
                className="input"
                type="text"
                name="firstName"
                required
                value={this.state.firstName}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="prompt-column">
              <div className="inputPrompt">Last Name:</div>
              <input
                className="input"
                type="text"
                name="lastName"
                required
                value={this.state.lastName}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="prompt-column">
              <div className="inputPrompt">Student ID:</div>
              <input
                className="input"
                type="number"
                min="0"
                step=""
                name="studentId"
                required
                value={this.state.studentId}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="prompt-column">
              <div className="inputPrompt">College Email:</div>
              <input
                className="input"
                type="email"
                name="collegeEmail"
                required
                value={this.state.collegeEmail}
                onChange={this.handleInputChange}
              />
            </div>
          </div>

          <div className="prompt-column">
            <div className="inputPrompt">Current Level:</div>
            <select
              className="dropDownOption"
              name="currentLevel"
              value={this.state.currentLevel}
              onChange={this.handleInputChange}>
              <option value="">select...</option>
              <option value="BS">BS</option>
              <option value="MS">MS</option>
              <option value="PHD">PHD</option>
            </select>
          </div>

          <div className="prompt-column">
            <div className="inputPrompt">Graduating Semester:</div>
            <select
              className="dropDownOption"
              name="graduatingSemester"
              value={this.state.graduatingSemester}
              onChange={this.handleInputChange}>
              <option value="">select...</option>
              <option value="Fall 2023">2023 Fall</option>
              <option value="Spring 2024">2024 Spring</option>
              <option value="Fall 2024">2024 Fall</option>
              <option value="Spring 2025">2025 Spring</option>
              <option value="Fall 2025">2025 Fall</option>
              <option value="Spring 2026">2026 Spring</option>
              <option value="Fall 2026">2026 Fall</option>
            </select>
          </div>

          <div className="prompt-column">
            <div className="inputPrompt">Current Major:</div>
            <select
              className="dropDownOption"
              name="currentMajor"
              value={this.state.currentMajor}
              onChange={this.handleInputChange}>
              <option value="">select...</option>
              <option value="CS">CS</option>
              <option value="ECE">ECE</option>
              <option value="EE">EE</option>
              <option value="IT">IT</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="prompt-column">
            <div className="inputPrompt">Cumulative GPA:</div>
            <input
              className="input"
              type="number"
              step="0.01"
              min="0"
              max="4.0"
              name="cumulativeGPA"
              required
              value={this.state.cumulativeGPA}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="prompt-column">
            <div className="inputPrompt">Hours Completed:</div>
            <input
              className="input"
              type="number"
              name="hoursCompleted"
              required
              value={this.state.hoursCompleted}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="prompt-column">
            <div className="inputPrompt">
              Are you GTA Certified? (International students only):
            </div>
            <input
              className="checkBox"
              type="checkbox"
              name="isGtaCertified"
              checked={this.state.isGtaCertified}
              onChange={this.handleCheckboxChange}
            />
          </div>

          <div className="prompt-column">
            <div className="inputPrompt">
              Courses you could serve as a grader for:
            </div>
            <Select
              name="coursesForGrader"
              className="select-classes"
              placeholder={<div>Show only selected Classes(s)</div>}
              onChange={this.handleGraderInputChange}
              value={this.state.coursesForGrader}
              options={this.props.availableCourses}
              isMulti
            />
          </div>

          <div className="prompt-column">
            <div className="inputPrompt">
              Courses you could serve as a lab instructor for:
            </div>
            <Select
              name="coursesForLabInstructor"
              className="select-classes"
              placeholder={<div>Show only selected Classes(s)</div>}
              onChange={this.handleGraderInputChange}
              value={this.state.coursesForLabInstructor}
              options={this.props.availableLabCourses}
              isMulti
            />
          </div>

          <div className="prompt-column">
            <div className="inputPrompt">Upload Resume:</div>
            <input
              type="file"
              name="resume"
              accept=".pdf, .doc, .docx"
              onChange={this.handleFileUpload}
            />
          </div>
          <div className="prompt-column">
            <button type="submit" class="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
