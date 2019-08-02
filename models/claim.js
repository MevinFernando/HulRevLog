const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClaimSchema = new Schema({
  rsId: {
    type: "String",
    required: true
  },
  auditorId: {
    type: "String",
    required: true,
    default: "NA"
  },
  initDate: {
    type: "String",
    required: true,
    default: Date()
  },
  approvalDate: {
    type: "String",
    required: true,
    default: "NA"
  },
  auditDate: {
    type: "String",
    required: true,
    default: "NA"
  },
  items: {
    type: ["Mixed"]
  },
  status: {
    type: "String",
    default: "NA"
  },
  code: {
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
module.exports = Claim = mongoose.model("claim", ClaimSchema);
