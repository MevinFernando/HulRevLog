const express = require("express");
const router = express.Router();

//Mongo Models
const Distributor = require("../../models/distributor");

// @route   GET api/distributors
// @desc    Get All distributors
// @access  Public
router.get("/", (req, res) => {
  //res.send("distributor API");
  Distributor.find()
    //  .select("id name category")
    .then(distributors => res.json(distributors))
    .catch(err => {
      console.log(err);
    });
});

router.get("/:rsId", (req, res) => {
  //res.send("distributor API");
  Distributor.findOne({ distributorId: req.params.rsId })
    //  .select("id name category")
    .then(distributors => res.json(distributors))
    .catch(err => {
      console.log(err);
    });
});

// @route   POST api/distributors
// @desc    Create An distributors
router.post("/", (req, res) => {
  const newDistributor = new Distributor(req.body);
  newDistributor
    .save()
    .then(item => res.json(item))
    .catch(err => console.log(err));
});

router.put("/:rsId", (req, res) => {
  Distributor.update({ rsId: req.params.rsId }, req.body)
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

// @route   DELETE api/distributors/:id
// @desc    Delete A distributor
router.delete("/:rsId", (req, res) => {
  Distributor.find({ rsId: req.params.rsId })
    .remove()
    .exec()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

module.exports = router;
