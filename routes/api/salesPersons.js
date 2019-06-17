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

router.get("/:salespersonId", (req, res) => {
  SalesPerson.find({ salesPersonId: req.params.salesPersonId })
    .then(result => res.json(result))
    .catch(err => console.log(err));
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

router.put("/:salesPersonId", (req, res) => {
  SalesPerson.update({ salesPersonId: req.params.salesPersonId }, req.body)
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:salesPersonId", (req, res) => {
  //console.log(req.body);
  const newSalesPerson = new SalesPerson(req.body);
  newSalesPerson
    .find({ salesPersonId: req.params.salesPersonId })
    .remove()
    .exec()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});
module.exports = router;
