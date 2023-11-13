var express = require("express");
var router = express.Router();
const withAdmin = require('../admin_middleware')

router.get("/", withAdmin, function (req, res) {
  res.sendStatus(200);
});

module.exports = router;