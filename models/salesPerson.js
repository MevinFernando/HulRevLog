const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SalesPersonSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});
//always give collection name as plural in the below line else mongo will do some crazy stuff
module.exports = SalesPerson = mongoose.model(
  "salesPersons",
  SalesPersonSchema
);
