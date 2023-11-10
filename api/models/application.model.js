const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
      min: 10000000,
      max: 99999999,
    },
    collegeEmail: {
      type: String,
      trim: true,
      match: ".*", //TODO: This needs to be updated with an appropriate regex
    },
    currentLevel: {
      type: String,
      trim: true,
      uppercase: true,
      enum: ["BACHELORS", "MASTERS", "DOCTORATE"],
    },
    graduatingSemester: {
      type: String,
      trim: true,
      match: "\A(SP|FL|SM) (\d\d\Z|20\d\d\Z)",
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);
