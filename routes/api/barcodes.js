const express = require("express");
const router = express.Router();

const Barcode = require("../../models/barcode.js");

// @route   GET api/barcodes
// @desc    Get All Barcodes
// @access  Public
router.get("/", (req, res) => {
  Barcode.find({})
    .then(barcodes => res.json(barcodes))
    .catch(err => {
      console.log(err);
    });
});

// @route   GET api/barcodes
// @desc    Get Prodcut Details
// @access  Public
router.get("/:barcode", (req, res) => {
  Barcode.find({ barcode: req.params.barcode })
    .then(result => res.json(result))
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
    productId: req.body.productId
  });

  newBarcode
    .save()
    .then(barcode => res.json(barcode))
    .catch(err => console.log(err));
});

// @route   DELETE api/retailers/:id
// @desc    Delete A Retailer
// @access  Public
router.delete("/:barcode", (req, res) => {
  Barcode.findById(req.params.barcode)
    .remove()
    .exec();
});

module.exports = router;
