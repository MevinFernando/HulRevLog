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
  console.log(req.params.returnId);
  Return.find({ returnId: req.params.returnId })
    .then(result => res.render("distributor/return", { ret: result }))
    .catch(err => console.log(result));
});

module.exports = router;
