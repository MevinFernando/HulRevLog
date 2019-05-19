const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BarcodeSchema = new Schema({
  barcode: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  }
});

module.exports = Barcode = mongoose.model("barcode", BarcodeSchema);
