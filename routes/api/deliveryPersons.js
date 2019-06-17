const express = require("express");
const router = express.Router();

const DeliveryPerson = require("../../models/deliveryPerson.js");

// @route   GET api/delivery/
// @desc    Get Return details for returnId
router.get("/", (req, res) => {
  DeliveryPerson.find({})
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

router.get("/:id", (req, res) => {
  DeliveryPerson.findOne({ id: req.params.id })
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

router.put("/:id", (req, res) => {
  DeliveryPerson.update({ id: req.params.id }, req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

router.delete("/:id", (req, res) => {
  DeliveryPerson.find({ id: req.params.id })
    .remove()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

module.exports = router;
