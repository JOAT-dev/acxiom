const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGOURI } = require("./config.js");
app.use(express.json({ limit: "50mb" }));
app.use(cors({ limit: "50mb" }));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // strictQuery:false
  // serverSelectionTimeoutMS: 9000000,
  // socketTimeoutMS: 9000000
};

mongoose.connect(MONGOURI, options);
// console.log(MONGOURI)
// mongoose.set('strictQuery', false);
mongoose.connection.on("connected", () => {
  console.log("connected to database.....");
});
mongoose.connection.on("error", (err) => {
  console.log("error in connection", err);
});

require("./model/user.model.js");
require("./model/remainder.model.js");
app.use("/auth", require("./routes/auth.js"));
app.use("/remainder", require("./routes/remainder.js"));

app.listen(port, () => console.log(`app listening on port ${port}!`));
