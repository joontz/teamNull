var express = require("express");
var router = express.Router();
const withAuth = require('../middleware')

const App = require("../models/application.model");

router.post("/", withAuth, function (req, res) {
    const {
        firstName,
        lastName,
        studentId,
        collegeEmail,
        currentLevel,
        graduatingSemester,
        cumulativeGPA,
        hoursCompleted,
        undergraduateDegree,
        currentMajor,
        applyingFor,
        isGtaCertified,
        coursesForLabInstructor,
    } = req.body;

    const app = new App({
        firstName,
        lastName,
        studentId,
        collegeEmail,
        currentLevel,
        graduatingSemester,
        cumulativeGPA,
        hoursCompleted,
        undergraduateDegree,
        currentMajor,
        applyingFor,
        isGtaCertified,
        coursesForLabInstructor,
    });

    app.save()
    .then(() => {
        res.status(200).send("success");
      })
      .catch((err) => {
        console.log(err);
      });

    });

module.exports = router;
