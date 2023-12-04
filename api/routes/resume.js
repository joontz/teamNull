var express = require("express");
var formidable = require("formidable");
var router = express.Router();
var fs = require('fs');
const withAuth = require('../middleware');
const { assert } = require("console");
const { AssertionError } = require("assert");

router.post("/", withAuth, function (req, res){
    try {
        const form = new formidable.IncomingForm();
        var path = "resumes/"
        form.parse(req, function (err, fields, data) {
                try {
                    path += fields['collegeEmail'][0];
                    if (!fs.existsSync(path)){
                        fs.mkdirSync(path);
                    }
                    path += '/' + data['resume'][0]['originalFilename'];
                    file = fs.readFileSync(data['resume'][0]['filepath']);
                    fs.writeFileSync(path, file);
                    res.status('200');
                } catch (err) {
                    console.log(err);
                    path = "";
                    res.status('500');
                } finally {
                    path = JSON.stringify(path);
                    res.send(path);
                }
        })
    } catch (err){
        console.log(err);
    }
})

module.exports = router;