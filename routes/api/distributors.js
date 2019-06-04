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

router.get("/:rsId", (req, res) => {
  //res.send("distributor API");
  Distributor.findOne({ distributorId: req.params.rsId })
    //  .select("id name category")
    .then(distributors => res.json(distributors))
    .catch(err => {
      console.log(err);
    });
});

router.get("/claims/:rsId", (req, res) => {
  //res.send("distributor API");
  RSReturn.findOne({ rsId: req.params.rsId })
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

router.get("/claims/new/:rsId", (req, res) => {
  // id , name,pkd,qty,weight,mrp,tur,reason,tot taxable amt,cgst, sgst,tot amt
  var weight = 0;
  var value = 0;
  var damagedValue = 0;
  var qty = 0;

  ReturnStock.find()
    .then(stocks => {
      for (var i = 0; i < stocks.length; i++) {
        weight = weight + stocks[i].qty * stocks[i].weight;
        stocks[i].tot_tax_amt =
          parseInt(stocks[i].tur) * parseInt(stocks[i].qty);
        stocks[i].cgst = (parseInt(stocks[i].tot_tax_amt) * 0.1).toFixed(2);
        stocks[i].sgst = (parseInt(stocks[i].tot_tax_amt) * 0.1).toFixed(2);
        stocks[i].tot_amt = (
          parseInt(stocks[i].tot_tax_amt) +
          parseInt(stocks[i].cgst) +
          parseInt(stocks[i].sgst)
        )
          .toFixed(2)
          .toString();
        value = parseInt(value) + parseInt(stocks[i].tot_amt).toFixed(2);
        var reason = stocks[i].reason;
        reason = reason.toString();
        if (reason.slice(0, 5) === "Damage")
          damagedValue = parseInt(damagedValue) + parseInt(stocks[i].tot_amt);
        qty = qty + stocks[i].qty * 1;
        //console.log(weight);
      }
      console.log(stocks);
      console.log(weight, value, qty);
      var claimDetails = {
        rsId: req.params.id,
        initDate: Date(),
        status: "60",
        value: value.toFixed(2).toString(),
        damagedValue: damagedValue,
        weight: weight,
        qty: qty,
        items: stocks
      };

      res.json(claimDetails);
    })
    .catch(err => res.json(err));
});

router.post("/claims/new/:rsId", (req, res) => {
  // Distributor.find({rsId:req.params.rsId})
  // .then()
  const distributorDetails = req.body.distributorDetails;
  const claimDetails = req.body.claimDetails;
  console.log(req.body);
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile(
      "./public/documents/" + req.params.rsId + "claim-details.pdf",
      err => {
        if (err) {
          res.json(err);
        }
        functions.mailer();
      }
    );
  //res.send(Promise.resolve());
  const newRSReturn = new RSReturn({
    rsId: req.params.rsId,
    initDate: Date(),
    status: "50",
    items: claimDetails.items,
    value: claimDetails.value,
    damagedValue: claimDetails.damagedValue,
    weight: claimDetails.weight,
    qty: claimDetails.qty
  });
  newRSReturn
    .save()
    //create and save PDF
    // send email to RSM
    //send PDF to Portal
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

router.post("/claims/update/:rsId", (req, res) => {
  // Distributor.find({rsId:req.params.rsId})
  // .then()
  const distributorDetails = req.body.distributorDetails;
  const claimDetails = req.body.claimDetails;
  console.log(req.body);
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile(
      "./public/documents/" + req.params.rsId + "claim-details.pdf",
      err => {
        if (err) {
          res.json(err);
        }
        // functions.mailer();
      }
    );

  //res.send(Promise.resolve());
  const newRSReturn = new RSReturn({
    rsId: req.params.rsId,
    initDate: Date(),
    status: "80",
    items: claimDetails.items,
    value: claimDetails.value,
    damagedValue: claimDetails.damagedValue,
    weight: claimDetails.weight,
    qty: claimDetails.qty
  });
  newRSReturn
    .save()
    //create and save PDF
    // send email to RSM
    //send PDF to Portal
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

router.get("/claim-pdf/:rsId", (req, res) => {
  res.sendFile(
    __basedir + "/public/documents/" + req.params.rsId + "claim-details.pdf"
  );
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
