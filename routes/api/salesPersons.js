const express = require("express");
const router = express.Router();

const SalesPerson = require("../../models/salesPerson.js");
const Retailer = require("../../models/retailer.js");

// @route   GET api/sales/
// @desc    Get Return details for returnId
router.get("/", (req, res) => {
  SalesPerson.find({})
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

router.get("/retailers/:salesPersonId", (req, res) => {
  Retailer.find({ salesPersonId: req.params.salesPersonId })
    .then(retailers => res.json(retailers))
    .catch(err => {
      console.log(err);
    });
});

// @route   POST api/salesPersons
// @desc    Create ASalesPerson record { req.body JSON object should match perfectly}
router.post("/", (req, res) => {
  //console.log(req.body);
  const newSalesPerson = new SalesPerson(req.body);
  newSalesPerson
    .save()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

module.exports = router;
