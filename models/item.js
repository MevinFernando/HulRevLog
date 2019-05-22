const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  pkd: {
    type: String,
    required: true,
    default:"ND"
    
  },
  mrp:{
    type: String,
    required: true,
    default:"ND"
  },
  qty: {
    type:String,
    required:true
  },
  reason: {
    type: String,
    required: true,
    default:"others"
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
