const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const remaindermodel = mongoose.model("remainder");
const authware = require("../middleware");

router.get("/", authware, (req, res) => {
  remaindermodel
    .find()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => console.log(err));
});

router.get("/yourremainder", authware, (req, res) => {
  console.log(res.locals.user);
  remaindermodel
    .find({ username: res.locals.user.username })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
});

router.post("/create", authware, (req, res) => {
  const { date, subject, text, email, contact, sms, occur, username } = req.body;
  console.log(username);
  const datat = new remaindermodel({
    date,
    text,
    subject,
    email,
    username: username,
    days: occur,
    sms,
    contact,
  });

  datat
    .save()
    .then((resul) => {
      console.log(resul);
      res.json({ message: "remainder created successfully", result: resul });
    })
    .catch((err) => {
      res.status(400).json({ error: "somthing went wrong try again", err: err });
      console.log(err);
    });
});

router.put("/modify", authware, async (req, res) => {
  const { id, text, email, contact, sms, days } = req.body;
  // console.log(username);
  if (!id) {
    return res.status(422).json({ error: "Something went wrong try again!" });
  }
  let datat = await remaindermodel.findById(id);
  datat.text = text;
  datat.email = email;
  datat.sms = sms;
  datat.contact = contact;
  datat.days = days;
  datat
    .save()
    .then((resul) => {
      console.log(resul);
      res.json({ message: "remainder modified successfully", result: resul });
    })
    .catch((err) => {
      res.status(400).json({ error: "somthing went wrong try again", err: err });
      console.log(err);
    });
});

router.put("/remaindersbyDate", authware, (req, res) => {
  const { date } = req.body;
  remaindermodel
    .find({ date: date })
    .then((result) => {
      res.json({ message: "foundsome", result });
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.put("/remaindersbyDateSubject", authware, (req, res) => {
//   const { date, subject } = req.body;
//   remaindermodel
//     .find({ date: date, subject: subject })
//     .then((result) => {
//       console.log(result);
//       res.json({ message: "foundsome", result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.delete("/remainder/:id", authware, (req, res) => {
  const { id } = req.params;
  console.log(id);
  remaindermodel
    .findByIdAndDelete(id)
    .then((result) => {
      console.log(result);
      res.json({ message: "deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "somthing went wrong try again" });
    });
});

module.exports = router;
