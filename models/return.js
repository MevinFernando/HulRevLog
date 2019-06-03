const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReturnSchema = new Schema({
  returnId: {
    type: "String",
    required: true
  },
  returnDate: {
    type: "String",
    default: Date()
  },
  retailerId: {
    type: "String",
    required: true
  },
  retailerName: {
    type: "String",
    required: true
  },
  items: {
    type: ["Mixed"]
  },
  status: {
    type: ["Mixed"]
  },
  amount: {
    type: "String",
    required: true
  },
  salesPersonId: {
    type: "String",
    required: true
  },
  salesPersonName: {
    type: "String",
    required: true
  },
  category: {
    type: "String"
  },
  packages: {
    type: "String",
    required: true
  }
});
module.exports = Return = mongoose.model("return", ReturnSchema);
