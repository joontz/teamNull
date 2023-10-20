var express = require("express");
var router = express.Router();


const User = require("../models/user.model");

router.post("/", function (req, res) {
  const { email, password } = req.body;

  const user = new User({ email, password });

  user
    .save()
    .then(() => {
      res.status(200).send("success");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
