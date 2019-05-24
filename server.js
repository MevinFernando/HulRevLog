const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const retailers = require("./routes/api/retailers");
const barcodes = require("./routes/api/barcodes");
const returns = require("./routes/api/returns");
const pickups = require("./routes/api/pickups");
const deliveryPersons = require("./routes/api/deliveryPersons");
const salesPersons = require("./routes/api/salesPersons");
const distributor = require("./routes/distributor");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept,Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//     return res.status(200).json({});
//   }
//   next();
// });

app.use("/api/retailers", retailers);
app.use("/api/barcodes", barcodes);
app.use("/api/returns", returns);
app.use("/api/pickups", pickups);
app.use("/api/deliveryPersons", deliveryPersons);
app.use("/api/salesPersons", salesPersons);

app.use("/distributor", distributor);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
