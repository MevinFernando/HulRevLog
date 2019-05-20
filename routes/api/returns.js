const express = require("express");
const router = express.Router();

const Return = require("../../models/return.js");

// @route   GET api/returns
// @desc    Get Return
// @access  Public
router.get("/", (req, res) => {
  Return.find({})
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   GET api/returns/returnId
// @desc    Get Return details for returnId
// @access  Public
router.get("/:returnId", (req, res) => {
  Return.find({ returnId: req.params.returnId })
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   POST api/returns
// @desc    Create A Return
// @access  Public
router.post("/", (req, res) => {
  //console.log(req.body);
  // const newReturn = new Return({
  //   returnId: "123456",
  //   returnDate: "11/05/2019",
  //   retailerId: "123456",
  //   retailerName: "raj stores",
  //   items: [
  //     {
  //       name: "ponds",
  //       pkd: "12/2018",
  //       mrp: "100.00",
  //       qty: "10",
  //       reason: "damaged"
  //     },
  //     {
  //       name: "lux",
  //       pkd: "12/2018",
  //       mrp: "50.00",
  //       qty: "10",
  //       reason: "expired"
  //     }
  //   ],
  //   status: "requested"
  // });

  const newReturn = new Return({
    returnId: req.body.returnId,
    returnDate: req.body.returnDate,
    retailerId: req.body.retailerId,
    retailerName: req.body.retailerName,
    items: req.body.items,
    status: req.body.status
  });
  newReturn
    .save()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

//@route PUT
//@desc update  return details

router.put("/:returnId", (req, res) => {
  Return.findOneAndUpdate({ returnId: req.params.returnId })
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

module.exports = router;
