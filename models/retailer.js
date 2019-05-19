const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RetailerSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = Item = mongoose.model("retailer", RetailerSchema);
