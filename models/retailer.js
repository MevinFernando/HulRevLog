const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RetailerSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = Retailer = mongoose.model("retailer", RetailerSchema);
