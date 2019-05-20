const express = require("express");
const router = express.Router();

const Return = require("../models/return.js");

router.get("/", (req, res) => {
  Return.find()
    .then(returns => res.render("distributor/returns", { returns: returns }))
    .catch(err => console.log(err));
  //res.render("distributor/home");
});

router.get("/returns/:returnId", (req, res) => {
  //console.log(req.params.returnId);
  Return.findOne({ returnId: req.params.returnId })
    .then(result => {
      console.log(result);
      res.render("distributor/return", {
        result: result,
        items: result.items,
        status: result.status
      });
    })
    .catch(err => console.log(result));
});

router.get("/returns/:returnId/confirm", (req, res) => {
  //console.log(req.params.returnId);
  const stat = {
    description: "Scheduled for pickup",
    time: Date.now().toString()
  };
  Return.update(
    { returnId: req.params.returnId },
    {
      $push: {
        status: {
          $each: [stat],
          $position: 0
        }
      }
    }
  )
    .then(result => {
      console.log(result);
      res.redirect("/distributor");
    })
    .catch(err => console.log(result));
});

module.exports = router;
