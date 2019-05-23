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
router.put("/:returnId/status/", (req, res) => {
  //console.log(req.params.returnId);

  if (req.body.code == "30") {
  }
  Return.update(
    { returnId: req.params.returnId },
    {
      $push: {
        status: {
          $each: [req.body],
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