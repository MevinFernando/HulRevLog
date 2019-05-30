const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DistributorSchema = new Schema({
  distributorId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pan: {
    type: String,
    required: true
  },
  supplierId: {
    type: String,
    required: true
  }
});

module.exports = Distributor = mongoose.model("distributor", DistributorSchema);
