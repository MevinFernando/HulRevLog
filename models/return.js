const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReturnSchema = new Schema({
  returnId: {
    type: "String"
  },
  returnDate: { type: Date, default: Date.now },
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
    type: "String"
  },
  amount: {
    type: Number
  }
});
module.exports = Return = mongoose.model("return", ReturnSchema);
