const express = require('express');
const router = express.Router();
var xml = require('xml');
const multer = require('multer');
const functions = require('../../controllers/functions');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  //fileFilter: fileFilter
});

//const upload = multer({ dest: "uploads/" });

const Return = require('../../models/return.js');
const Pickup = require('../../models/pickup.js');
const Product = require('../../models/product.js');
const ReturnStock = require('../../models/returnStock.js');

// @route   GET api/returns
// @desc    Get  All Returns
// @access  Public
router.get('/', (req, res) => {
  Return.find()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   GET api/returns/:returnId
// @desc    Get  A Return
router.get('/:returnId', (req, res) => {
  Return.findOne({ returnId: req.params.returnId })
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   GET api/returns/:returnId/status/:code
// @desc    Get Returns of Particular Status
router.get('/:returnId/status/:code/', (req, res) => {
  Return.find({
    'status.0.code': req.params.code
  })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// @route   GET api/returns/returnId
// @desc    Get Return History For Of A Salesperson
router.get('/history/:salesPersonId', (req, res) => {
  Return.find({
    salesPersonId: req.params.salesPersonId
  })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// @route   GET api/returns/retailer/:retailerId
// @desc    Get Return details for retailerId
router.get('/retailer/:retailerId', (req, res) => {
  Return.find({ retailerId: req.params.retailerId })
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//

// @route   POST api/returns
// @desc    Create A Return  { req.body JSON object should match perfectly}
router.post('/', (req, res) => {
  //console.log(req.body);
  const newReturn = new Return(req.body);
  newReturn
    .save()
    .then(result => res.json(result))

    .catch(err => console.log(err));
});

// @route   POST api/returns/new
// @desc    Create A Return  {Only For Salesperson App}
router.post('/new', upload.single('signatureImage'), (req, res) => {
  console.log(req.body);
  console.log(req.file); //Contains Retailer Signature Image

  var amount = 0;
  var returnObject = {
    returnId: Math.floor(Math.random() * 1000000).toString(),
    returnDate: Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata'
    }),
    retailerId: req.body.retailerId.toString(),
    retailerName: req.body.retailerName.toString(),
    items: [],
    status: [],
    amount: 0,
    salesPersonId: req.body.salesPersonId.toString(),
    salesPersonName: req.body.salesPersonName.toString(),
    packages: req.body.packages.toString()
  };

  for (var i = 0; i < req.body.items.length; i++) {
    var item = {
      id: req.body.items[i].id.toString(),
      name: req.body.items[i].name.toString(),
      pkd: req.body.items[i].pkd.toString(),
      mrp: req.body.items[i].mrp.toString(),
      tur: (parseFloat(req.body.items[i].mrp) * 0.8).toString(),
      qty: req.body.items[i].qty.toString(),
      weight: req.body.items[i].weight.toString(),
      reason: req.body.items[i].reason.toString(),
      category: req.body.items[i].category.toString()
    };
    // Product.findOne({ productId: req.body.items[i].productId })
    //   .then(result => {
    //     //  item.weight = result.weight;
    //   })
    //   .catch(err => console.log(err));

    amount =
      parseFloat(amount) +
      parseFloat(item.tur) * parseFloat(req.body.items[i].qty);
    returnObject.items.push(item);
  }
  returnObject.amount = amount.toString();
  var newStatus = {
    code: req.body.code.toString(),
    description: 'return requested',
    //signatureImage: req.file.path,
    time: Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata'
    })
  };

  returnObject.status.push(newStatus);

  const newReturn = new Return(returnObject);
  newReturn
    .save()
    .then(result => res.json(result))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//

//@route PUT api/returns/:returnId
//@desc update  return details for a returnId except status as items list
router.put('/:returnId', (req, res) => {
  Return.update({ returnId: req.params.returnId }, req.body)
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

//@route PUT  api/returns/:returnId/item/:itemId
//@desc update item details of a particular returnId
router.put('/:returnId/item/:itemId', (req, res) => {
  Return.findOne({
    returnId: req.params.returnId,
    'items.id': req.params.itemId
  });

  Return.update(
    { returnId: req.params.returnId, 'items.id': req.params.itemId },
    {
      $set: {
        'items.$.mrp': req.body.mrp,
        'items.$.qty': req.body.qty,
        'items.$.pkd': req.body.pkd,
        'items.$.reason': req.body.reason
      }
    }
  )
    .then(result => res.json(result))
    .catch(err => console.log(err));
});
//@route PUT  api/returns/:returnId/items
//@desc Set Entire Item Array
router.put('/:returnId/items', (req, res) => {
  var amount = functions.calcAmount(req.body.items);
  Return.update(
    { returnId: req.params.returnId },
    { $set: { items: req.body.items }, amount: amount }
  )
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

//update returnStock on Completing RS Audit
const updateStock = async function(item) {
  console.log('in func');
  await ReturnStock.find({
    id: item.id,
    pkd: item.pkd,
    mrp: item.mrp,
    reason: item.reason
  })
    .then(result => {
      ///console.log(result);
      if (result.length == 1) {
        //console.log(1);
        var newQty = parseInt(item.qty) + parseInt(result[0].qty);

        //console.log(newQty);

        return ReturnStock.update(
          { id: result[0].id, category: item.category },
          { qty: newQty.toString() }
        ).exec();
      } else {
        //console.log(2);
        //console.log(item);

        const returnStock = {
          id: item.id,
          name: item.name,
          pkd: item.pkd,
          mrp: item.mrp,
          reason: item.reason,
          qty: item.qty,
          tur: (parseFloat(item.mrp) * 0.8).toString(),
          weight: item.weight,
          category: item.category,
          type: 'trade'
        };
        const newReturnStock = new ReturnStock(returnStock);
        return newReturnStock
          .save()
          .then(res => {
            //  console.log("updated");
          })
          .catch(err => console.log(err));
      }
    })
    .then(result => console.log(result))
    .catch(err => {
      console.log(err);
    });

  return;
};

// @desc update status details of a particular returnId
router.put('/:returnId/status', upload.single('signatureImage'), (req, res) => {
  //console.log(req.body);
  //console.log(req.file);
  var currentStatusCode = 0;

  Return.findOne({ returnId: req.params.returnId })
    .then(ret => {
      currentStatusCode = ret.status[0].code;

      if (
        req.body.code - currentStatusCode > 15 ||
        req.body.code == currentStatusCode
      )
        res.status(500).send({
          error: 'Wrong Status code Sent'
        });
      else {
        var d = Date().toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata'
        });
        if (req.body.code == '20') {
          var newStatus = {
            code: '20',
            description: 'scheduled for pickup',
            time: d
          };
          d = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata'
          });
          console.log(newStatus);
          console.log(req.body.no_days);
          // if (req.body.no_days > 0) {
          //   console.log("custom");
          // d.setDate(d.getDate() + parseInt(no_days));
          // } else {
          //   console.log("regular");
          d.setDate(d.getDate() + 2);
          // }
          console.log(d.toString());
          d = d.toString();
          console.log('custom');
          Return.findOne({ returnId: req.params.returnId }).then(result => {
            const newPickup = new Pickup({
              returnId: req.params.returnId,
              pickupId: '1',
              retailerId: result.retailerId,
              pickupDate: d,
              packages: result.packages
            });
            newPickup
              .save()
              .then(pickup => console.log(pickup))
              .catch(err => console.log(err));
          });
        } else if (req.body.code == '30' || req.body.code == '31') {
          // if (req.file == undefined) {
          //   console.log("hit 30");
          //   //  console("no sign not found");
          //   res.send("No sign Image sent");
          // }
          var newStatus = {
            code: req.body.code,
            description: 'picked up',
            time: d,
            signatureImage: req.file.path
          };
          console.log(newStatus);
        } else if (req.body.code == '32') {
          var newStatus = {
            code: '32',
            description: req.body.description,
            time: d,
            packages: req.body.packages
          };
          Pickup.findOneAndDelete({ returnId: req.params.returnId })
            .then(console.log('successfully removed pickup'))
            .catch(err => res.status(404).json({ success: false }));
        } else if (req.body.code == '40') {
          var newStatus = {
            code: '40',
            description: 'reached RS',
            time: d
          };
          Pickup.findOneAndDelete({ returnId: req.params.returnId })
            .then(console.log('successfully removed pickup'))
            .catch(err => res.status(404).json({ success: false }));
        } else if (req.body.code == '50') {
          var newStatus = {
            code: '50',
            description: 'audited at RS',
            time: d
          };
          Return.findOne({ returnId: req.params.returnId })
            .then(result => {
              console.log(result.items);
              for (var i = 0; i < result.items.length; i++) {
                updateStock(result.items[i]);
                console.log('after update');
              }
            })
            .catch(err => console.log(err));
        } else {
          console.log(newStatus);
          console.log('hit else');
          res.status(500).send({
            error: 'No matching Status'
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
              message: 'Status Updated',
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

//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//

// @route   DELETE
// @desc    Delete A Return
router.delete('/:returnId', (req, res) => {
  Return.findOneAndDelete({ returnId: req.params.returnId })
    .then(res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});
// @route   DELETE
// @desc    Delete All Items of A Return
router.delete('/:returnId/items', (req, res) => {
  Return.update({ returnId: req.params.returnId }, { $set: { items: [] } })
    .exec()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   DELETE
// @desc    Delete A Particular Item by id
router.delete('/:returnId/items/:itemId', (req, res) => {
  Return.update(
    { returnId: req.params.returnId },
    { $pull: { items: { id: req.params.itemId } } },
    { safe: true }
  )
    .exec()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   DELETE api/returns/:returnId/status
// @desc    Delete All Status
router.delete('/:returnId/status', (req, res) => {
  Return.update({ returnId: req.params.returnId }, { $set: { status: [] } })
    .exec()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

// @route   DELETE
// @desc    Delete A Status  from array
router.delete('/:returnId/status/:code', (req, res) => {
  Return.update(
    { returnId: req.params.returnId },
    { $pull: { status: { code: req.params.code } } },
    { safe: true }
  )
    .exec()
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

module.exports = router;
