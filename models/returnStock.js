const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReturnStockSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  pkd: {
    type: String,
    required: true,
    default: "ND"
  },
  mrp: {
    type: String,
    required: true,
    default: "ND"
  },
  qty: {
    type: String,
    default: "1"
  },
  reason: {
    type: String,
    required: true,
    default: "others"
  },
  tur: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  cgst: {
    type: String,
    default: "NA"
  },
  sgst: {
    type: String,
    default: "NA"
  },
  tot_tax_amt: {
    type: String,
    default: "NA"
  },
  tot_amt: {
    type: String,
    default: "NA"
  },
  type: {
    type: String,
    default: "trade",
    required: true
  }
});

module.exports = returnStock = mongoose.model(
  "returnstocks",
  ReturnStockSchema
);
