const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//TODO: Figure out where resumes are going so we can store a ref to them.
const root = "";

//define an application object
const applicationSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      minlength: 1,
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 1,
    },
    studentId: {
      type: Number,
      min: 0,
      max: 99999999,
    },
    collegeEmail: {
      type: String,
      trim: true,
    },
    currentLevel: {
      type: String,
      trim: true,
      uppercase: true,
    },
    graduatingSemester: {
      type: String,
      trim: true,
    },
    cumulativeGPA: {
      type: Number,
      min: 0,
      max: 4,
    },
    hoursCompleted: 
    {
      type: Number,
    },
    undergraduateDegree: {
      type: String,
      trim: true,
    },
    currentMajor: {
      type: String,
      trim: true,
    },
    applyingFor: {
      type: String,
      trim: true,
    },
    isGtaCertified: {
      type: Boolean,
    },
    coursesForLabInstructor: {
      type: String,
      trim: true,
    },
    resume: {
      type: String,
      get: v => '${root}/resumes/${v}',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);
