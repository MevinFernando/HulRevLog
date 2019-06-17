const express = require("express");
const router = express.Router();

const Retailer = require("../../models/retailer.js");

// @route   GET api/retailes
// @desc    Get All Retailers
// @access  Public
router.get("/", (req, res) => {
  Retailer.find()
    //  .select("id name category")
    .then(retailers => res.json(retailers))
    .catch(err => {
      res.json(err);
    });
});

router.get("/:retailerId", (req, res) => {
  Retailer.findOne({ id: req.params.retailerId })
    //  .select("id name category")
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/salesperson/:salesPersonId", (req, res) => {
  Retailer.find({ salesPersonId: req.params.salesPersonId })
    .then(retailers => res.json(retailers))
    .catch(err => {
      console.log(err);
    });
});

// @route   POST api/retailers
// @desc    Create An Retailers
router.post("/", (req, res) => {
  const newRetailer = new Retailer(req.body);

  newRetailer
    .save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

router.put("/:retailerId", (req, res) => {
  Retailer.update({ id: req.params.retailerId }, req.body)
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

// @route   DELETE api/retailers/:id
// @desc    Delete A Retailer
router.delete("/:retailerId", (req, res) => {
  Retailer.find({ id: req.params.retailerId })
    .remove()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

module.exports = router;
