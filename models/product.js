const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
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
  },
  category: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  pkgType: {
    type: String,
    required: true
  },
  life: {
    type: String
  }
});

module.exports = Product = mongoose.model("product", ProductSchema);
