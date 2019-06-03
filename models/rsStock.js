const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RSStockSchema = new Schema({
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
    default: "others"
  },
  weight: {
    type: String,
    required: true
  }
});

module.exports = RSStock = mongoose.model("rsstock", RSStockSchema);
