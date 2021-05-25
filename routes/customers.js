const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const verify = require('./verfiyToken');


// get all customers
// router.get('/',verify,async(req,res) => {
router.get('/',async(req,res) => {
    try{
        const customers = await Customer.find();
        res.json(customers);
    } catch (err){
        res.json({ message:err});
    }
});
// get specific customer
//router.get('/:specific',async(req,res) => {
router.get('/:specific',verify('1'),async(req,res) => {
    try { 
        const customer = await Customer.findOne({id : req.params.specific})
        res.json(customer);
    }catch(err) {
        res.json({ message: err});
    }
});
// update specific customer
router.patch('/:specific',async(req,res) => {
    try { 
        console.log(req.body);
        const updateCustomer = await Customer.updateOne(
        {id : req.params.specific},
        {$set: {city:req.body.city,
                address:req.body.address}});
        res.json(updateCustomer);
    }catch(err) {
        res.json({ message: err});
    }
});
module.exports = router;