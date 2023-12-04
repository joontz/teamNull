var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const secret = 'verysecret';

const User = require('../models/user.model');

router.post('/', async (req, res) => {
  const reqToken = req.cookies.token;

  jwt.verify(reqToken, secret, function (err, decoded) {
    const email = decoded.email;
    console.log(email.email);
    const payload = { email };
    const token = jwt.sign(payload, secret, {
      expiresIn: '-1h',
    });
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
        path: '/',
      })
      .sendStatus(200);
  });
});

module.exports = router;
