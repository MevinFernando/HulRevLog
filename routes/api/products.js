const express = require("express");
const router = express.Router();

const Product = require("../../models/product.js");

// @route   GET api/products/:barcode.....
// @desc    Get particular product for Barcode
// @access  Public
router.get("/:barcode", (req, res) => {
  //res.send(req.query);
  Product.find({ barcode: req.params.barcode })
    .then(barcodes => res.json(barcodes))
    .catch(err => {
      console.log(err);
    });
});

// @route   GET api/category/:barcode.....
// @desc    Get products of a category
// @access  Public
router.get("/category/:id", (req, res) => {
  //res.send(req.query);
  Product.find({ category: req.params.id })
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

// @route   DELETE api/products/:barcode
// @desc    Delete A Retailer
router.delete("/", (req, res) => {
  Product.find({ barcode: req.query.barcode })
    .remove()
    .exec();
});

module.exports = router;
