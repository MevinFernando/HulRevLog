const express = require("express");
const router = express.Router();

const Return = require("../../models/return.js");
const Pickup = require("../../models/pickup.js");

// @route   GET api/pickups
// @desc    Get Pickup details for a delivery Person(pickupId)   for the day
router.get("/:pickupId", (req, res) => {
  Pickup.find({ pickupId: req.params.pickupId })
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   POST api/pickups
// @desc    Create A Pickup { req.body JSON object should match perfectly}
router.post("/", (req, res) => {
  //console.log(req.body);
  const newPickup = new Pickup(req.body);
  newPickup
    .save()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

module.exports = router;
