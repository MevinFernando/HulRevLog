const express = require("express");
const router = express.Router();

const RSStock = require("../../models/rsStock.js");
const Product = require("../../models/product.js");

// @route   GET api/rsStocks
// @desc    Get All rsStocks
// @access  Public
router.get("/", (req, res) => {
  RSStock.find()
    //  .select("id name category")
    .then(rsStock => res.json(rsStock))
    .catch(err => {
      console.log(err);
    });
});

//-----------------------------------------------------------------------------------------------------------------

// @route   POST api/rsStocks
// @desc    Create An rsStocks
router.post("/", (req, res) => {
  var item;
  RSStock.find({
    id: req.body.id,
    pkd: req.body.pkd,
    mrp: req.body.mrp,
    reason: req.body.reason
  })
    .then(result => {
      //console.log(result);
      //var newQty = +req.body.qty + +result.qty;
      console.log(newQty);
      if (result.length > 0) {
        console.log(1);
        return RSStock.update({ id: result.id }, { qty: newQty }).exec();
        // .then(result => res.json(result))
        // .catch(err => {
        //   res.send(err);
        // });
      } else {
        console.log(2);
        const rsStock = {
          id: req.body.id,
          name: req.body.name,
          pkd: req.body.pkd,
          mrp: req.body.mrp,
          reason: req.body.reason,
          qty: req.body.qty,
          tur: req.body.tur,
          weight: req.body.weight
        };
        const newRSStock = new RSStock(rsStock);
        return newRSStock.save();
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
  RSStock.update({ id: req.params.id }, req.body)
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

// @route   DELETE api/rsStocks/:id
// @desc    Delete A Retailer
router.delete("/:id", (req, res) => {
  RS.findById(req.params.id)
    .remove()
    .exec()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

module.exports = router;
