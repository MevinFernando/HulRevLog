global.__basedir = __dirname;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
//const cors = require('cors');

const retailers = require("./routes/api/retailers");
const products = require("./routes/api/products");
const returns = require("./routes/api/returns");
const pickups = require("./routes/api/pickups");
const deliveryPersons = require("./routes/api/deliveryPersons");
const salesPersons = require("./routes/api/salesPersons");
const returnStocks = require("./routes/api/returnStocks");
const distributors = require("./routes/api/distributors");

const app = express();

//app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));
app.use(morgan("dev"));

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/retailers", retailers);
app.use("/api/products", products);
app.use("/api/returns", returns);
app.use("/api/pickups", pickups);
app.use("/api/deliveryPersons", deliveryPersons);
app.use("/api/salesPersons", salesPersons);
app.use("/api/returnStocks", returnStocks);
app.use("/api/distributors", distributors);

app.get("/", (req, res) => {
  res.send("API HOME PAGE");
});

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
