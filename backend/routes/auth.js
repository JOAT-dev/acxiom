const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const usermodel = mongoose.model("user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config.js");
const authware = require("../middleware");

router.get("/", authware, (req, res) => {
  res.json(res.locals.user);
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(422).json({ error: "Fill all the details" });
  }
  let foundone = await usermodel.findOne({ username: username });
  console.log(foundone);
  if (foundone) {
    res.json({ error: "username already exists" });
  } else {
    const usercre = new usermodel({
      username,
      password,
    });
    usercre
      .save()
      .then((resul) => {
        console.log(resul);
        res.json({ message: "user created successfully" });
      })
      .catch((err) => {
        res.status(400).json({ error: "somthing went wrong try again", err: err });
        console.log(err);
      });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(422).json({ error: "Fill all the details" });
  }
  let foundone = await usermodel.findOne({ username: username });
  //   const foundone = usermodel.findOne({ username: username });
  console.log(foundone);
  if (!foundone) {
    return res.json({ error: "Invalid username or password" });
  } else {
    if (foundone.password === password) {
      const token = jwt.sign({ _id: foundone._id, username: foundone.username }, JWT_SECRET);
      return res.json({ message: "userlogged in successfully", token, user: foundone });
    } else {
      return res.json({ error: "Invalid username or password" });
    }
  }
});

module.exports = router;
