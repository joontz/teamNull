var express = require("express");
var router = express.Router();


const User = require("../models/user.model");

router.post("/", function (req, res) {
  const { email, password, pin } = req.body;
  let admin;

  if (pin === "5555") {
    admin = true
  } else {
    admin = false
  }


  const user = new User({ email, password, admin });

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
