const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RSReturnSchema = new Schema({
  rsId: {
    type: "String",
    required: true
  },
  auditorId: {
    type: "String",
    default: "NA"
  },
  initDate: {
    type: "String",
    required: true,
    default: Date()
  },
  approvalDate: {
    type: "String",
    default: "NA"
  },
  status: {
    type: "String",
    default: "NA"
  },
  value: {
    type: "String",
    required: true
  },
  damagedValue: {
    type: "String",
    required: true
  },
  weight: {
    type: "String",
    required: true
  },
  qty: {
    type: "String",
    required: true
  }
});
module.exports = RSReturn = mongoose.model("rsreturn", RSReturnSchema);
