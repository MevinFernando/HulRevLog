const express = require("express");
const router = express.Router();
var xml = require("xml");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  fileFilter: fileFilter
});

//const upload = multer({ dest: "uploads/" });

const Return = require("../../models/return.js");
const Pickup = require("../../models/pickup.js");
const Rule = require("../../models/rule.js");

// @route   GET api/returns
// @desc    Get  All Returns
// @access  Public
router.get("/", (req, res) => {
  Return.find({})
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

router.get("/rules", (req, res) => {
  Rule.find({})
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
router.put("/:returnId/status", upload.single("signatureImage"), (req, res) => {
  console.log(req.body.code);
  console.log(req.file);

  var currentStatusCode = 0;
  Return.findOne({ returnId: req.params.returnId })
    .then(ret => {
      //console.log(ret);
      currentStatusCode = ret.status[0].code;

      if (req.body.code - currentStatusCode != 10)
        res.status(500).send({
          error: "Wrong Status code Sent"
        });
      else {
        //res.send("correct status update");
        var d = Date();
        if (req.body.code == "20") {
          var newStatus = {
            code: "20",
            description: "scheduled for pickup",
            time: d
          };
          d = new Date();
          console.log(newStatus);
          d.setDate(d.getDate() + 2);
          console.log(d.toString());
          d = d.toString();
          Return.findOne({ returnId: req.params.returnId }).then(result => {
            const newPickup = new Pickup({
              returnId: req.params.returnId,
              pickupId: "1",
              retailerId: result.retailerId,
              pickupDate: d
            });
            newPickup
              .save()
              .then(pickup => console.log(pickup))
              .catch(err => console.log(err));
          });
        } else if (req.body.code == "30") {
          if (req.file.path == null) {
            console("no sign not found");
            res.send("No sign Image sent");
          } else {
            console("no found");
          }
          var newStatus = {
            code: "30",
            description: "picked up",
            time: d,
            signatureImage: req.file.path
          };
        } else if (req.body.code == "40") {
          var newStatus = {
            code: "40",
            description: "reached RS",
            time: d
          };
          Pickup.findOneAndDelete({ returnId: req.params.returnId })
            .then(console.log("successfully removed pickup"))
            .catch(err => res.status(404).json({ success: false }));
        } else if (req.body.code == "50") {
          var newStatus = {
            code: "50",
            description: "audited at RS",
            time: d
          };
          res.redirect("/api/returnStocks/hit", { items: req.body.items });
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
            res.json({
              message: "Status Updated",
              result: result
            });
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err =>
      res.status(500).json({
        error: err
      })
    );
});

router.post("/rule", (req, res) => {
  const newRule = new Rule(req.body);
  newRule
    .save()
    .then(result => res.json(result))
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
