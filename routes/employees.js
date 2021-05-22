const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const verify = require('./verfiyToken');

// get all employees
router.get('/',async(req,res) => {
//router.get('/',verify,async(req,res) => {
    try{
        const employees = await Employee.find();
        res.json(employees);
    } catch (err){
        res.json({ message:err});
    }
});
// get specific employee
router.get('/:employeeID',async(req,res) => {;
    try { 
        const employee = await Employee.findById(req.params.employeeID);
        res.json(employee);
    }catch(err) {
        res.json({ message: err});
    }
});
// post specific employee
router.post('/', async (req,res) => {
    const employee = new Employee({
      title: req.body.title,
      description: req.body.description  
    });
    try{
        const savedEmployee = await employee.save();
        res.json(savedEmployee);    
    } catch (err){
        res.json({ message:err});
    }
});

// delete specific employee
router.delete('/:employeeID',async(req,res) => {
    try { 
        const removeEmployee = await Employee.deleteOne({_id : req.params.employeeID});
        res.json(removeEmployee);
    }catch(err) {
        res.json({ message: err});
    }
});

// update specific employee
router.patch('/:employeeID',async(req,res) => {
    try { 
        const updateEmployee = await Employee.updateOne(
        {_id : req.params.employeeID},
        {$set: {title:req.body.title}});
        res.json(updateEmployee);
    }catch(err) {
        res.json({ message: err});
    }
});

// get my id

router.get('/getmyid',async(req,res) => {
//router.get('/getmyid',verify,async(req,res) => {
    try { 
        res.json(req.user);
    }catch(err) {
        res.json({ message: err});
    }
});
module.exports = router;