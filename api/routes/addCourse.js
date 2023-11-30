var express = require("express");
var router = express.Router();
const withAuth = require('../middleware')

const Course = require("../models/course.model");

router.post("/", withAuth, function (req, res) {
    const {
        courseTitle,
        courseAbbrev,
        isLabCourse
    } = req.body;

    const app = new Course({
        courseTitle,
        courseAbbrev,
        isLabCourse
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
