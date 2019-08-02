const express = require("express");
const router = express.Router();

const ReturnStock = require("../../models/returnStock.js");
const Product = require("../../models/product.js");

// @route   GET api/returnStocks
// @desc    Get All returnStocks
// @access  Public
router.get("/", (req, res) => {
  ReturnStock.find()
    //  .select("id name category")
    .then(returnStock => res.json(returnStock))
    .catch(err => {
      console.log(err);
    });
});

// @route   GET api/returnStocks
// @desc    Get All returnStocks  {only used by Auditor}
// @access  Public
router.get("/all", (req, res) => {
  ReturnStock.find()
    .then(returnStock => res.json([{ items: returnStock }])) //made for eshwars app
    //.then(returnStock => res.json(returnStock)) //made for eshwars app
    .catch(err => {
      console.log(err);
    });
});

// @route   GET api/returnStocks/:id
// @desc    Get A returnStock
// @access  Public
router.get("/:id", (req, res) => {
  ReturnStock.findOne({ id: req.params.id })
    //  .select("id name category")
    .then(returnStock => res.json(returnStock))
    .catch(err => {
      console.log(err);
    });
});

//-----------------------------------------------------------------------------------------------------------------

// @route   POST api/returnStocks
// @desc    add items array to returnStocks
router.post("/", (req, res) => {
  var returnStocks = [];
  for (var i = 0; i < req.body[i].length; i++) {
    ReturnStock.findOne({
      id: req.body[i].id,
      pkd: req.body[i].pkd,
      mrp: req.body[i].mrp,
      reason: req.body[i].reason,
      type: req.body[i].type
    })
      .then(result => {
        console.log(result);

        if (result == null) {
          console.log(1);
          var newQty = parseInt(req.body[i].qty) + parseInt(result.qty);
          console.log(newQty);
          return ReturnStock.update(
            { id: result.id, category: req.body[i].category },
            { qty: newQty.toString() }
          )
            .exec()
            .then(result => res.json(result));
        } else {
          console.log(2);
          const returnStock = {
            id: req.body[i].id,
            name: req.body[i].name,
            pkd: req.body[i].pkd,
            mrp: req.body[i].mrp,
            reason: req.body[i].reason,
            qty: req.body[i].qty,
            tur: (parseFloat(req.body[i].mrp) * 0.8).toString(),
            weight: req.body[i].weight,
            category: req.body[i].category,
            type: "trade"
          };
          returnStocks.push(returnStock);
        }
      })
      .catch(err => {
        res.send(err);
      });
  }
  ReturnStock.insertMany(returnStocks, (err, results) => {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
});

//-----------------------------------------------------------------------------------------------------------------

// @route   POST api/returnStocks
// @desc    Create An returnStock
router.put("/insert", (req, res) => {
  console.log(req.body);
  var returnStocks = [];
  for (var i = 0; i < req.body.items.length; i++) {
    const returnStock = {
      id: req.body.items[i].id,
      name: req.body.items[i].name,
      pkd: req.body.items[i].pkd,
      mrp: req.body.items[i].mrp,
      reason: req.body.items[i].reason,
      qty: req.body.items[i].qty,
      tur: (parseFloat(req.body.items[i].mrp) * 0.8).toString(),
      weight: req.body.items[i].weight,
      category: req.body.items[i].category,
      type: "trade"
    };
    returnStocks.push(returnStock);
  }
  ReturnStock.insertMany(returnStocks, (err, results) => {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
});

router.put("/:id", (req, res) => {
  ReturnStock.update({ id: req.params.id }, req.body)
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

//--------------------------------------------------------------------------------------------------------------------

// @route   DELETE api/returnStocks
// @desc    Delete All returnStocks
router.delete("/", (req, res) => {
  ReturnStock.find()
    .remove()
    .exec()
    .then(result => res.json(res))
    .catch(err => res.json(err));
});

// @route   DELETE api/returnStocks/:id
// @desc    Delete A particular ReturnStock
router.delete("/:id", (req, res) => {
  ReturnStock.find({ id: req.params.id })
    .remove()
    .exec()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

module.exports = router;
