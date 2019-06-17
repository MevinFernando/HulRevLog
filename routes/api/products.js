const express = require("express");
const router = express.Router();

const Product = require("../../models/product.js");

// @access  Public
router.get("/", (req, res) => {
  //res.send(req.query);
  Product.find()
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
    });
});

// @route   GET api/products/:barcode.....
// @desc    Get particular product for Barcode
// @access  Public
router.get("/:barcode", (req, res) => {
  //res.send(req.query);
  Product.findOne({ barcode: req.params.barcode })
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
    });
});

// @route   GET api/category/:category
// @desc    Get products of a category
// @access  Public
router.get("/category/:categoryCode", (req, res) => {
  //res.send(req.query);
  Product.find({ category: req.params.categoryCode })
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
    });
});

// @route   POST api/products
// @desc    Create An products
router.post("/", (req, res) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

router.put("/:barcode", (req, res) => {
  Product.update({ barcode: req.params.barcode }, req.body)
    .exec()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// @route   DELETE api/products/:barcode
// @desc    Delete A Retailer
router.delete("/:barcode", (req, res) => {
  Product.findOneAndDelete({ barcode: req.params.barcode })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

module.exports = router;
