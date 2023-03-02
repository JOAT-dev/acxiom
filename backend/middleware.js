const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config.js");
const mongoose = require("mongoose");
const usermodel = mongoose.model("user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(12);
  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  // console.log(authorization)
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(422).json({ error: "you must be logged in" });
    }
    // console.log(payload)
    const { _id } = payload;
    usermodel
      .findById(_id)
      .then((loggeduser) => {
        if (!loggeduser) {
          return res.status(422).json({ error: "Try again by logging in again" });
        }
        console.log(1234);
        res.locals.user = loggeduser;
        // console.log(res.locals.user);
        next();
      })
      .catch((err) => {
        console.log(err);
        return res.status(422).json({ error: "Try again by logging in again" });
      });
  });
};
