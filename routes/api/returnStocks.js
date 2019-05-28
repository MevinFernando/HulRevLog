const express = require("express");
const router = express.Router();

const ReturnStock = require("../../models/returnStock.js");
const Product = require("../../models/product.js");

// @route   GET api/retailes
// @desc    Get All returnStock
// @access  Public
router.get("/", (req, res) => {
  ReturnStock.find()
    //  .select("id name category")
    .then(returnStock => res.json(returnStock))
    .catch(err => {
      console.log(err);
    });
});

//-----------------------------------------------------------------------------------------------------------------

// @route   POST api/returnStock
// @desc    Create An returnStock
router.post("/", (req, res) => {
  var item;
  ReturnStock.findOne({
    id: req.body.id,
    pkd: req.body.pkd,
    mrp: req.body.mrp,
    reason: req.body.reason
  })
    .then(result => {
      var newQty = +req.body.qty + +result.qty;
      console.log(newQty);
      if (result != null) {
        return ReturnStock.update({ id: result.id }, { qty: newQty }).exec();
        // .then(result => res.json(result))
        // .catch(err => {
        //   res.send(err);
        // });
      } else {
        console.log(2);
        const returnStock = {
          id: req.body.id,
          name: req.body.name,
          pkd: req.body.pkd,
          mrp: req.body.mrp,
          reason: req.body.reason,
          qty: req.body.qty,
          tur: req.body.tur,
          weight: req.body.weight
        };
        const newReturnStock = new ReturnStock(returnStock);
        return newReturnStock.save();
        // .then(result => {
        //   res.json(result);
        // })
        // .catch(err => res.json(err));
      }
    })
    .then(result => res.json(result))
    .catch(err => {
      res.send(err);
    });
});

//--------------------------------------------------------------------------------------------------------------------

router.patch("/:id", (req, res) => {
  const id = req.params.id;

  // const updateOps = {};
  // console.log(req.body);
  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }
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

// @route   DELETE api/returnStock/:id
// @desc    Delete A Retailer
router.delete("/:id", (req, res) => {
  Retailer.findById(req.params.id)
    .remove()
    .exec();
});

module.exports = router;
