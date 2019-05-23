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

router.get("/:retailerId", (req, res) => {
  Retailer.find({ id: req.params.retailerId })
    .then(retailers => res.json(retailers))
    .catch(err => {
      console.log(err);
    });
});

// @route   POST api/retailers
// @desc    Create An Retailers
router.post("/", (req, res) => {
  //console.log(req.body);
  // const newRetailer = new Retailer({
  //   id: req.body.id,
  //   name: req.body.name
  // });

  const newRetailer = new Retailer(req.body);

  newRetailer
    .save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

// @route   DELETE api/retailers/:id
// @desc    Delete A Retailer
router.delete("/:id", (req, res) => {
  Retailer.findById(req.params.id)
    .remove()
    .exec();
});

module.exports = router;
