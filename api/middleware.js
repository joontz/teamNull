const jwt = require("jsonwebtoken");
const secret = "verysecret";

const withAuth = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send("Unauthorized no token");
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized bad token");
      } else {
        req.email = decoded.email;
        res.status(200);
        next();
      }
    });
  }
};
module.exports = withAuth;
