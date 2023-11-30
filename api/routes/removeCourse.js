var express = require("express");
var router = express.Router();
const withAuth = require('../middleware')

const Course = require("../models/course.model");

router.post("/", withAuth, function (req, res) {
    const {
        coursesToDelete
    } = req.body;

    const listOfCourses = coursesToDelete.map(item => item.courseAbbrev)

    Course.deleteMany({courseAbbrev: { $in: listOfCourses}})
    .then((result) => {
        if (result.deletedCount === 1) {
            res.status(200).send("success");
        } else {
            res.status(404).send("Course not found");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
