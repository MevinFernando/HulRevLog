const express = require("express");
const router = express.Router();

const Return = require("../../models/return.js");
const Pickup = require("../../models/pickup.js");

// @route   GET api/pickups
// @desc    Get Pickup details for a delivery Person(pickupId) for the day
router.get("/", (req, res) => {
  Pickup.find()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   GET api/pickups
// @desc    Get Pickup details for a delivery Person(pickupId) for the day
router.get("/:pickupId", (req, res) => {
  Pickup.find({ pickupId: req.params.pickupId })
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   POST api/pickups
// @desc    Create A Pickup
router.post("/", (req, res) => {
  //console.log(req.body);
  const newPickup = new Pickup(req.body);
  newPickup
    .save()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

router.put("/:pickupId", (req, res) => {
  Pickup.updateMany({ pickupId: req.params.pickupId }, req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

router.delete("/", (req, res) => {
  Pickup.deleteMany()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

router.delete("/:pickupId", (req, res) => {
  Pickup.deleteMany({ pickupId: req.params.pickupId })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

module.exports = router;
