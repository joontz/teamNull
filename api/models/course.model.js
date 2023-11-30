const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//TODO: Figure out where resumes are going so we can store a ref to them.
const root = "";

//define an application object
const courseSchema = new Schema(
  {
    courseTitle: {
      type: String,
      trim: true,
      minlength: 1,
    },
    courseAbbrev: {
      type: String,
      trim: true,
      minlength: 1,
    },
    isLabCourse: {
      type: Boolean,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
