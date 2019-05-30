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
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  salesPersonId: {
    type: String,
    required: true
  }
});

module.exports = Retailer = mongoose.model("retailer", RetailerSchema);
