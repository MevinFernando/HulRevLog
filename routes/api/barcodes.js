const express = require("express");
const router = express.Router();

const Barcode = require("../../models/barcode.js");

// @route   GET api/barcodes?barcode=.....
// @desc    Get particular product for Barcode
// @access  Public
router.get("/", (req, res) => {
  //res.send(req.query);
  Barcode.find({ barcode: req.query.barcode })
    .then(barcodes => res.json(barcodes))
    .catch(err => {
      console.log(err);
    });
});

// @route   POST api/barcodes
// @desc    Create An barcode
// @access  Public
router.post("/", (req, res) => {
  const newBarcode = new Barcode({
    barcode: req.body.barcode,
    productName: req.body.productName,
    productId: req.body.productId,
    category: req.body.category
  });

  newBarcode
    .save()
    .then(barcode => res.json(barcode))
    .catch(err => console.log(err));
});

// @route   DELETE api/retailers/:id
// @desc    Delete A Retailer
// @access  Public
router.delete("/", (req, res) => {
  Barcode.findById(req.query.barcode)
    .remove()
    .exec();
});

module.exports = router;
