var express = require("express");
const jwt = require("jsonwebtoken");
var router = express.Router();

const User = require("../models/user.model");

router.post("/", function (req, res) {
  const { email, password } = req.body;
  const secret = "verysecret";
  const testUser = new User({ email, password });

  User.findOne({ email }).then((email, error) => {
    if (!testUser) {
      res.status(401);
    } else if (error) {
      console.error(err);
      res.status(500);
    } else {
      email.checkPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: "1h",
          });
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: false,
              path: "/",
            })
            .sendStatus(200);
        }
      });
    }
  });
});

module.exports = router;
