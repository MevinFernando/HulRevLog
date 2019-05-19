const express = require("express");

const router = express.Router();

const Retailer = require("../../models/retailer.js");

// @route   GET api/retailes
// @desc    Get All Retailers
// @access  Public
router.get("/", (req, res) => {
  //res.send("Retailer API");
  Retailer.find()
    .then(retailers => res.json(retailers))
    .catch(err => {
      console.log(err);
    });
});

// // @route   POST api/items
// // @desc    Create An Item
// // @access  Public
// router.post("/", (req, res) => {
//   const newItem = new Item({
//     name: req.body.name
//   });

//   newItem.save().then(item => res.json(item));
// });

module.exports = router;
