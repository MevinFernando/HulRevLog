const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReturnSchema = new Schema({
  returnId: {
    type: "String"
  },
  returnDate: {
    type: "String",
    default: Date()
  },
  retailerId: {
    type: "String"
  },
  retailerName: {
    type: "String"
  },
  items: {
    type: ["Mixed"]
  },
  status: {
    type: ["Mixed"]
  },
  amount: {
    type: "String"
  },
  salesmanId: {
    type: "String"
  },
  salesmanName: {
    type: "String"
  },
  category: {
    type: "String"
  }
});
module.exports = Return = mongoose.model("return", ReturnSchema);
