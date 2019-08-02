const express = require("express");
const router = express.Router();

const pdf = require("html-pdf");

const Claim = require("../../models/claim");
const ReturnStock = require("../../models/returnStock.js");

const pdfTemplate = require("../../templates/index");
const functions = require("../../controllers/functions");

router.get("/", (req, res) => {
  Claim.find()
    //  .select("id name category")
    .then(claims => res.json(claims))
    .catch(err => {
      console.log(err);
    });
});

router.get("/approved", (req, res) => {
  Claim.findOne({ status: "70" })
    //  .select("id name category")
    .then(returns => res.json(returns))
    .catch(err => {
      console.log(err);
    });
});

router.get("/:rsId", (req, res) => {
  //res.send("distributor API");
  Claim.findOne({ rsId: req.params.rsId })
    //  .select("id name category")
    .then(returns => res.json(returns))
    .catch(err => {
      console.log(err);
    });
});

router.get("/:rsId/pdf", (req, res) => {
  res.sendFile(
    __basedir + "/public/documents/" + req.params.rsId + "_claim-details.pdf"
  );
});

router.get("/:rsId/generate", (req, res) => {
  //console.log("claim generate");

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
        stocks[i].cgst = stocks[i].tot_tax_amt * 0.1;
        stocks[i].sgst = stocks[i].tot_tax_amt * 0.1;
        stocks[i].tot_amt =
          parseInt(stocks[i].tot_tax_amt) +
          parseInt(stocks[i].cgst) +
          parseInt(stocks[i].sgst);
        stocks[i].tot_amt = stocks[i].tot_amt;

        value = parseInt(value) + parseInt(stocks[i].tot_amt);
        var reason = stocks[i].reason;
        //console.log(reason.slice(0, 6));
        if (reason.slice(0, 6) === "Damage")
          damagedValue = parseInt(damagedValue) + parseInt(stocks[i].tot_amt);
        qty = qty + stocks[i].qty * 1;
        //console.log(stocks[i]);
      }

      //console.log(stocks);
      //console.log(weight, value, qty);

      const claimDetails = {
        rsId: req.params.rsId,
        initDate: Date(),
        status: "60",
        value: value.toFixed(2).toString(),
        damagedValue: damagedValue,
        weight: weight,
        qty: qty,
        items: stocks
      };
      const newClaim = new Claim(claimDetails);
      console.log("claim-Details", claimDetails);
      res.json(newClaim);
    })
    .catch(err => res.json(err));
});

router.post("/:rsId/generate", (req, res) => {
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
        stocks[i].cgst = stocks[i].tot_tax_amt * 0.1;
        stocks[i].sgst = stocks[i].tot_tax_amt * 0.1;
        stocks[i].tot_amt =
          parseInt(stocks[i].tot_tax_amt) +
          parseInt(stocks[i].cgst) +
          parseInt(stocks[i].sgst);
        stocks[i].tot_amt = stocks[i].tot_amt;

        value = parseInt(value) + parseInt(stocks[i].tot_amt);
        var reason = stocks[i].reason;
        // if (reason.slice(0, 5) === "Damage")
        //   damagedValue = parseInt(damagedValue) + parseInt(stocks[i].tot_amt);
        qty = qty + stocks[i].qty * 1;
        //console.log(stocks[i]);
      }

      //console.log(stocks);
      //console.log(weight, value, qty);

      const claimDetails = {
        rsId: req.params.rsId,
        initDate: Date(),
        status: "60",
        value: value.toFixed(2).toString(),
        damagedValue: damagedValue,
        weight: weight,
        qty: qty,
        items: stocks
      };
      const newClaim = new Claim(claimDetails);
      newClaim.save().then(result => {
        pdf
          .create(pdfTemplate(result), {})
          .toFile(
            "./public/documents/" + req.params.rsId + "_claim-details.pdf",
            err => {
              if (err) {
                res.json(err);
              }
              functions.mailer(req.params.rsId);
            }
          );
        res.json(result);
      });
    })
    .catch(err => res.json(err));
});

router.get("/:rsId/status/:id", (req, res) => {
  Claim.findOne({ rsId: req.params.rsId }).then(result => {
    if (result == null) {
      res.status(404).json({
        error: "no claim found"
      });
    } else if (result.status == "60" && req.params.id == "70") {
      //schedule audit and update status

      var code = Math.floor(Math.random() * 10000).toString();
      Claim.update(
        { rsId: req.params.rsId },
        {
          status: req.params.id,
          auditorId: "A123",
          approvalDate: Date(),
          code: code
        }
      )
        .then(result => {
          functions.auditMailer(rsId, code);
          res.send("response recorded");
        })
        .catch(err => {
          res.send(err);
        });
    } else if (result.status == "70" && req.params.id == "80") {
      //schedule audit and update status

      Claim.update(
        { rsId: req.params.rsId },
        {
          $set: { items: req.body },
          status: req.params.id,
          auditorId: "A123",
          auditDate: Date()
        }
      )
        .then(result => {
          res.json({ message: "Audited" });
        })
        .catch(err => {
          res.send(err);
        });
    }
  });
});

router.put("/:rsId", (req, res) => {
  Claim.update({ rsId: req.params.rsId }, req.body)
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:rsId", (req, res) => {
  Claim.find({ rsId: req.params.rsId })
    .remove()
    .exec()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

module.exports = router;
