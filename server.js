const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const retailers = require("./routes/api/retailers");

const app = express();

app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use("/api/retailers", retailers);

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
