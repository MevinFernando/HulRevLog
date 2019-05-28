const express = require("express");
const router = express.Router();
var xml = require("xml");

const Return = require("../../models/return.js");

// @route   GET api/returns
// @desc    Get  All Returns
// @access  Public
router.get("/", (req, res) => {
  Return.find({})
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   GET api/returns/returnId
// @desc    Get Return details for returnId
router.get("/:returnId", (req, res) => {
  Return.find({ returnId: req.params.returnId })
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   GET api/returns/retailer/:retailerId
// @desc    Get Return details for retailerId
router.get("/retailer/:retailerId", (req, res) => {
  Return.find({ retailerId: req.params.retailerId })
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//

// @route   POST api/returns
// @desc    Create A Return  { req.body JSON object should match perfectly}
router.post("/", (req, res) => {
  //console.log(req.body);
  const newReturn = new Return(req.body);
  newReturn
    .save()
    .then(result => res.json(result))

    .catch(err => console.log(err));
});

//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//

//@route PUT
//@desc update  return details for a returnId except status ans items list
router.put("/:returnId", (req, res) => {
  Return.update({ returnId: req.params.returnId }, req.body)
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

//@route PUT  api/returns/:returnId/item/:name
//@desc update item details of a particular returnId
router.put("/:returnId/item/:name", (req, res) => {
  Return.update(
    { returnId: req.params.returnId, "items.name": req.params.name },
    {
      $set: {
        "items.$.mrp": req.body.mrp,
        "items.$.qty": req.body.qty,
        "items.$.pkd": req.body.pkd,
        "items.$.reason": req.body.reason
      }
    }
  )
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @desc update status details of a particular returnId
router.put("/:returnId/status", (req, res) => {
  console.log(req.body.code);

  if (req.body.code == "15") {
    var d = new Date();
    d.setDate(d.getDate() + 2);
    var newStatus = {
      code: "15",
      description: "scheduled for pickup",
      time: Date(d.toString())
    };
    console.log(newStatus);
  } else if (req.body.code == "30") {
    var newStatus = {
      code: "30",
      description: "Reached RS",
      time: Date(d.toString())
    };
  } else {
    console.log(newStatus);
    console.log("hit else");
    res.status(500).send({
      error: "No matching Status"
    });
    return;
  }

  Return.update(
    { returnId: req.params.returnId },
    {
      $push: {
        status: {
          $each: [newStatus],
          $position: 0
        }
      }
    }
  )
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
});

//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//

// @route   DELETE
// @desc    Delete A Status item from array
router.delete("/:returnId/status/:code", (req, res) => {
  Return.update(
    { returnId: req.params.returnId },
    { $pull: { status: { code: req.params.code } } },
    { safe: true }
  )
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   DELETE
// @desc    Delete A Return
router.delete("/:returnId", (req, res) => {
  Return.findOneAndDelete({ returnId: req.params.returnId })
    .then(res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
