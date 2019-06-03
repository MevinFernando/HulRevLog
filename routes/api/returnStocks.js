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
    .then(returnStock => res.json({ items: returnStock }))
    .catch(err => {
      console.log(err);
    });
});

//-----------------------------------------------------------------------------------------------------------------

// @route   POST api/returnStocks
// @desc    Create An returnStock
router.post("/", (req, res) => {
  ReturnStock.find({
    id: req.body.id,
    pkd: req.body.pkd,
    mrp: req.body.mrp,
    reason: req.body.reason
  })
    .then(result => {
      console.log(result);

      if (result.length == 1) {
        console.log(1);
        var newQty = parseInt(req.body.qty) + parseInt(result[0].qty);
        console.log(newQty);
        return ReturnStock.update(
          { id: result[0].id, category: req.body.category },
          { qty: newQty.toString() }
        ).exec();
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
          tur: (parseFloat(req.body.mrp) * 0.8).toString(),
          weight: req.body.weight,
          category: req.body.category,
          type: "trade"
        };
        const newReturnStock = new ReturnStock(returnStock);
        return newReturnStock.save().then(result => {
          res.json(result);
        });
        //.catch(err => res.json(err));
      }
    })
    .then(result => res.json(result))
    .catch(err => {
      res.send(err);
    });
});

// @route   POST api/returnStocks
// @desc    Create An returnStock
router.post("/new", (req, res) => {
  ReturnStock.find({
    id: req.body.id,
    pkd: req.body.pkd,
    mrp: req.body.mrp,
    reason: req.body.reason
  })
    .then(result => {
      console.log(result);
      if (result.length == 1) {
        console.log(1);
        var newQty = parseInt(req.body.qty) + parseInt(result[0].qty);
        console.log(newQty);
        return ReturnStock.update(
          { id: result[0].id, category: req.body.category },
          { qty: newQty.toString() }
        ).exec();
      } else {
        console.log(2);
        const returnStock = {
          id: req.body.id,
          name: req.body.name,
          pkd: req.body.pkd,
          mrp: req.body.mrp,
          reason: req.body.reason,
          qty: req.body.qty,
          tur: (parseFloat(req.body.mrp) * 0.8).toString(),
          weight: req.body.weight,
          category: req.body.category,
          type: "trade"
        };
        const newReturnStock = new ReturnStock(returnStock);
        return newReturnStock.save().then(result => {
          res.json(result);
        });
        //.catch(err => res.json(err));
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

// @route   DELETE api/returnStocks/:id
// @desc    Delete A returnStock
router.delete("/:id", (req, res) => {
  RS.findById(req.params.id)
    .remove()
    .exec();
});

module.exports = router;
