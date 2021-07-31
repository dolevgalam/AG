const express = require('express');
const router = express.Router();
const verify = require('./verfiyToken');
const multer = require('multer');
const order = require('../models/priceQuote');
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
  

// get all orders
router.get('/',async(req,res) => {
//router.get('/',verify,async(req,res) => {
        try{
            const orders = await order.find({status : "בוצעה הזמנה"});
            res.json(orders);
        } catch (err){
            res.json({ message:err.message});
        }
});

// get specific order
router.get('/:specific',async(req,res) => {;
    try { 
        const specificorder = await order.findOne({_id : req.params.specific});
        res.json(specificorder);
    }catch(err) {
        res.json({ message: err});
    }
});
router.patch('/:specific',async(req,res) => {
    console.log(req.body)
    try { 
        const updateorder = await order.updateOne(
        {_id : req.params.specific},
        {$set: {
            price: 2150,
            // status: req.body.status,
            hours: req.body.hours,
            item1: "רשת צל",
            item1_l: req.body.item1_l,
            item1_w: req.body.item1_w,
            item2: "יוטה",
            item2_l: req.body.item2_l,
            item2_w: req.body.item2_w,
            canvas: req.body.canvas
            }});
        res.json(updateorder);
    }catch(err) {
        res.json({ message: err.message});
    }
});

// post specific order
     router.post('/',upload.single('file'), async (req, res) => {
// router.post('/', async (req, res) => {
    console.log(req.body)
    const order = new order({
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
        const savedorder = await order.save();
        res.send("Done");
    } catch (err) {
        res.json({ message:err.message});
    }
});


module.exports = router;