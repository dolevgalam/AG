const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const verify = require('./verfiyToken');
const multer = require('multer');

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

//specific
// get all employees
router.get('/',async(req,res) => {
//router.get('/',verify,async(req,res) => {
    try{
        console.log("get all emp");
        const employees = await Employee.find();
        res.json(employees);
    } catch (err){
        res.json({ message:err});
    }
});
// get specific employee
router.get('/:specific',async(req,res) => {;
    try { 
        const employee = await Employee.findById(req.params.specific);
        res.json(employee);
    }catch(err) {
        res.json({ message: err});
    }
});
// post specific employee
router.post('/',upload.single('file') ,async (req,res) => {
    console.log(req.body);
    const employee = new Employee({
        _id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        dateofbirth: req.body.dateofbirth,
        city: req.body.city,
        address: req.body.address,
        phone: req.body.phone,
        picturepath: "/images/" + req.file.filename,
    });
    try{
        const savedEmployee = await employee.save();
        console.log(savedEmployee);
        res.json(savedEmployee);    
    } catch (err){
        res.json({ message:err});
    }
});

// delete specific employee
router.delete('/:specific',async(req,res) => {
    try { 
        console.log("delete");
        const removeEmployee = await Employee.deleteOne({_id : req.params.specific});
        res.json(removeEmployee);
    }catch(err) {
        res.json({ message: err.message});
    }
});

// update specific employee
router.patch('/:specific',async(req,res) => {
    try { 
        console.log("backend update");
        const updateEmployee = await Employee.updateOne(
        {_id : req.params.specific},
        {$set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            dateofbirth: req.body.dateofbirth,
            phone: req.body.phone,
        }});
        console.log(updateEmployee);
        res.json(updateEmployee);
    }catch(err) {
        res.json({ message: err});
    }
});

module.exports = router;