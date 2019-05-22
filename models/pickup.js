const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PickupSchema = new Schema({
  returnId: {
    type: String,
    required: true
  },
  pickupId: {
    type: String,
    required: true
  },
  retailerId: {
    type: String,
    required: true
  },
  pickupDate: {
    type: String,
    required: true,
    default: Date()
  }
});

module.exports = Pickup = mongoose.model("pickup", PickupSchema);
