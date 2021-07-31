const express = require('express');
const router = express.Router();
const verify = require('./verfiyToken');
const CancelpriceQuote = require('../models/cancelpriceQuote');
const PriceQuote = require('../models/priceQuote');
const date = require('../public/pub');

/*
//define storage for the images
const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, './public/images');
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null,file.originalname);
    },
  });
  
  //upload parameters for multer
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });
*/  

// get all pricequotes
router.get('/',async(req,res) => {
//router.get('/',verify,async(req,res) => {
        try{
            const cancelpricequotes = await CancelpriceQuote.find();
            res.json(cancelpricequotes);
        } catch (err){
            res.json({ message:err.message});
        }
});
/*
// get specific pricequote
router.get('/:specific',async(req,res) => {;
    try { 
        const specificPricequote = await PriceQuote.findOne({_id : req.params.specific});
        res.json(specificPricequote);
    }catch(err) {
        res.json({ message: err});
    }
});
router.patch('/:specific',upload.single('image'),async(req,res) => {
    try { 
        const updatePricequote = await PriceQuote.updateOne(
        {_id : req.params.specific},
        {$set: {
            customer_id: req.body.customer_id,
            salesitem: req.body.salesitem,
            description: req.body.description,
            length: req.body.length,
            width: req.body.width,
            height: req.body.height,
            picturepath: "/images/" + req.file.filename,
            business_days: req.body.business_days,
            price: req.body.price,
            status: req.body.status,
            }});
        res.json(updatePricequote);
    }catch(err) {
        res.json({ message: err});
    }
});
router.patch('/cancel/:specific',async(req,res) => {
    try { 
        console.log("cancel");
        const updatePricequote = await PriceQuote.updateOne(
        {_id : req.params.specific},
        {$set: {
            status: "מבוטלת",
            }});
        
        res.json(updatePricequote);
    }catch(err) {
        res.json({ message: err});
    }

});
*/
// post specific priceQuote
router.post('/', async (req, res) => {
    const cancelpriceQuote = new CancelpriceQuote({
        _id: req.body.id,
        reason: req.body.reason,
        description: req.body.description,
        //cancel_by: req.body.cancel_by,
    });
    const updatePricequote = await PriceQuote.updateOne(
        {_id : req.body.id},
        {$set: {
            status: "מבוטלת",
            }});
    try {
        const savedCaneclpriceQuote = await cancelpriceQuote.save();
        res.send("Done");
    } catch (err) {
        res.json({ message:err.message});
    }
});

module.exports = router;