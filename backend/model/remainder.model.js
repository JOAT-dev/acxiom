const mongoose = require("mongoose");

var remainderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  subject: { type: String },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  sms: { type: String },
  days: { type: String },
  text: { type: String, required: true },
  date: { type: Date, required: true },
});

// remainderSchema.index({ subject: 1, date: 1 });

module.exports = mongoose.model("remainder", remainderSchema);
