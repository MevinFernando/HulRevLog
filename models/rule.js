const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RuleSchema = new Schema({
  ppDate: {
    type: String,
    required: true
  },
  fdDate: {
    type: String,
    required: true
  },
  hcDate: {
    type: String,
    required: true
  }
});
//always give collection name as plural in the below line else mongo will do some crazy stuff
module.exports = Rule = mongoose.model("rules", RuleSchema);
