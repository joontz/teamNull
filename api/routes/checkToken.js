var express = require("express");
var router = express.Router();
const withAuth = require('../middleware')

router.get("/", withAuth, function (req, res) {
  res.sendStatus(200);
});

module.exports = router;
