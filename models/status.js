const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StatusSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
    time: {
      type: String,
      default:Date()
    }
});

module.exports = Status = mongoose.model("status", StatusSchema);
