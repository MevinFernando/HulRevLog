const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const retailers = require("./routes/api/retailers");
const barcodes = require("./routes/api/barcodes");
const returns = require("./routes/api/returns");
const pickups = require("./routes/api/pickups");
const deliveryPersons = require("./routes/api/deliveryPersons");

const distributor = require("./routes/distributor");

const app = express();

app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use("/api/retailers", retailers);
app.use("/api/barcodes", barcodes);
app.use("/api/returns", returns);
app.use("/api/pickups", pickups);
app.use("/api/deliveryPersons", deliveryPersons);

app.use("/distributor", distributor);

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
