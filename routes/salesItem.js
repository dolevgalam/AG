const express = require('express');
const router = express.Router();
const verify = require('./verfiyToken');
const multer = require('multer');
const salesItem = require('../models/salesItem');

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
  

// get all salesItems
router.get('/',async(req,res) => {
    //router.get('/',verify,async(req,res) => {
        try{
            const salesItems = await salesItem.find();
            res.json(salesItems);
        } catch (err){
            res.json({ message:err.message});
        }
});

// get specific salesItem
router.get('/:specific',async(req,res) => {;
    try { 
        const specificSalesItem = await salesItem.findOne({name : req.params.specific});
        res.json(specificSalesItem);
    }catch(err) {
        res.json({ message: err});
    }
});

// delete specific salesItem
router.delete('/:specific',async(req,res) => {;
    console.log('delete');
    try { 
        const specificSalesItem = await salesItem.deleteOne({name : req.params.specific});
        res.json(specificSalesItem);
    }catch(err) {
        res.json({ message: err});
    }
});

// update specific salesItem
router.patch('/:specific',upload.single('image'),async(req,res) => {
    try { 
        console.log("update");
        const updateSalesItem = await salesItem.updateOne(
        {name : req.params.specific},
        {$set: {name: req.body.name,
                description: req.body.description,
                //picturepath: "/images/" + req.file.filename
            }});
        res.json(updateSalesItem);
    }catch(err) {
        res.json({ message: err.message});
    }
});
// post specific salesItem
router.post('/',upload.single('image'), async (req, res) => {
    const salesItem = new SalesItem({
        name: req.body.name,
        description: req.body.description,
        picturepath: "/images/" + req.file.filename
    });
    try {
        const savedSalesItem = await salesItem.save();
        res.send("Done");
    } catch (err) {
        res.json({ message:err});
    }
});


module.exports = router;