const express = require("express");
const router = express.Router();

const Rule = require("../../models/rule");

router.get("/", (req, res) => {
  Rule.find({})
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

router.post("/", (req, res) => {
  const newRule = new Rule(req.body);
  newRule
    .save()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

//no put route since only one document present in table currently

router.delete("/", (req, res) => {
  Rule.find()
    .remove()
    .exec()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

module.exports = router;
