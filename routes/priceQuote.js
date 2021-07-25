const express = require('express');
const router = express.Router();
const verify = require('./verfiyToken');
const multer = require('multer');
const PriceQuote = require('../models/priceQuote');
const date = require('../public/pub');

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
  

// get all pricequotes
router.get('/',async(req,res) => {
//router.get('/',verify,async(req,res) => {
        try{
            const pricequotes = await PriceQuote.find();
            res.json(pricequotes);
        } catch (err){
            res.json({ message:err.message});
        }
});

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
            _id: req.body.id,
            customer: req.body.customer,
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
        res.json({ message: err.message});
    }
});

// post specific priceQuote
     router.post('/',upload.single('file'), async (req, res) => {
// router.post('/', async (req, res) => {
    console.log(req.body)
    const priceQuote = new PriceQuote({
        _id: req.body.id,
        customer: req.body.customer,
        saleitem: req.body.saleitem,
        description: req.body.description,
        picturepath: "/images/" + req.file.filename,
        canvas: req.body.canvas,
        date: req.body.date,
        datenow: req.body.datenow,
        fullname: req.body.fullname
    });
    try {
        const savedPriceQuote = await priceQuote.save();
        res.send("Done");
    } catch (err) {
        res.json({ message:err.message});
    }
});


module.exports = router;