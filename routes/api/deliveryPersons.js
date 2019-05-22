const express = require("express");
const router = express.Router();

const DeliveryPersons = require("../../models/deliveryPerson.js");

// @route   GET api/delivery/
// @desc    Get Return details for returnId
router.get("/", (req, res) => {
  DeliveryPersons.find({})
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   POST api/deliveryPersons
// @desc    Create A DeliveryPerson record { req.body JSON object should match perfectly}
router.post("/", (req, res) => {
  //console.log(req.body);
  const newDeliveryPerson = new DeliveryPerson(req.body);
  newDeliveryPerson
    .save()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

module.exports = router;
