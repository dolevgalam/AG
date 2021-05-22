const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verify = require('./verfiyToken');

// get all users
// router.get('/',verify('3'),async(req,res) => {
router.get('/',async(req,res) => {

    try{
        const users = await User.find();
        res.json(users);
    } catch (err){
        res.json({ message:err});
    }
});

// get specific user
//router.get('/:specific',verify('3'),async(req,res) => {
router.get('/:specific',async(req,res) => {
    try { 
        const user = await User.findById(req.params.specific);
        res.json(user);
    }catch(err) {
        res.json({ message: err});
    }
});

module.exports = router;