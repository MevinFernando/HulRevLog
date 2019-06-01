const express = require("express");
const router = express.Router();
const pdf = require("html-pdf");
const path = require("path");
const nodemailer = require("nodemailer");

//Mongo Models
const Distributor = require("../../models/distributor");
const RSReturn = require("../../models/rsreturn");
const ReturnStock = require("../../models/returnStock");
const pdfTemplate = require("../../templates/index");

const functions = require("../../controllers/functions");

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

router.get("/returns", (req, res) => {
  //res.send("distributor API");
  RSReturn.find()
    //  .select("id name category")
    .then(returns => res.json(returns))
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

router.post("/return/new/:id", (req, res) => {
  var weight = 0;
  var value = 0;
  var damagedValue = 0;
  var qty = 0;
  ReturnStock.find()
    .then(stocks => {
      for (var i = 0; i < stocks.length; i++) {
        weight = weight + stocks[i].qty * stocks[i].weight;
        value = value + stocks[i].qty * stocks[i].mrp;
        if (stocks[i].reason === "damaged")
          damagedValue = damagedValue + stocks[i].qty * stocks[i].mrp;
        qty = qty + stocks[i].qty * 1;
        //console.log(weight);
      }
      console.log(weight, value, qty);
      var data = {
        rsId: req.params.id,
        initDate: Date(),
        status: "50",
        value: value,
        damagedValue: damagedValue,
        weight: weight,
        qty: qty,
        items: []
      };
      data.items = stocks;
      console.log(data);
      pdf
        .create(pdfTemplate(data), {})
        .toFile("./public/documents/claim-details.pdf", err => {
          if (err) {
            res.json(err);
          }
          functions.mailer();
        });

      res.send(Promise.resolve());

      // const newRSReturn = new RSReturn({
      //   rsId: req.params.id,
      //   initDate: Date(),
      //   status: "50",
      //   value: value,
      //   damagedValue: damagedValue,
      //   weight: weight,
      //   qty: qty
      // });
      // newRSReturn
      //   .save()
      //   //create and save PDF
      //   // send email to RSM
      //   //send PDF to Portal
      //   .then(result => res.json(result))
      //   .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.get("/fetch-pdf", (req, res) => {
  res.sendFile(__basedir + "/claim-details.pdf");
});

router.get("/return/:rsId/status/:id", (req, res) => {
  RSReturn.update({ rsId: req.params.rsId }, { status: req.params.id })
    .then(result => {
      res.send("Response Recorded");
    })
    .catch(err => {
      res.send(err);
      console.log(err);
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  Distributor.update({ id: req.params.id }, req.body)
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
router.delete("/:id", (req, res) => {
  Distributor.findById(req.params.id)
    .remove()
    .exec();
});

module.exports = router;
