const jwt = require("jsonwebtoken");
const secret = "verysecret";

const withAdmin = function (req, res, next) {
  const token = req.cookies.token;

  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      res.status(401).send("Unauthorized bad token");
    } else {
      admin = decoded.email.admin;
      // console.log(admin)
      if (admin === true) {
        res.status(200);
        next();
      } else {
        res.status(401).send("Unauthorized non admin");
      }
    }
  });
};

module.exports = withAdmin;
