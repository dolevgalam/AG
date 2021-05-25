const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Customer = require('../models/customer');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res) => {
    console.log("backend register start")
    console.log(req.body);
    const schema = Joi.object({ 
        id: Joi.string() .min(9) .max(9) .required(),
        password: Joi.string() .min(6) .required(),
        firstname: Joi.string() .min(2) .max(20) .required(),
        lastname: Joi.string() .min(2) .max(20) .required(),
        email: Joi.string() .min(6) .required() .email(),
        dateofbirth: Joi.date() .required(),
        city: Joi.string() .min(2) .max(20) .required(),
        address: Joi.string() .min(2) .max(20) .required(),
        phone: Joi.string() .min(2) .max(20) .required()
    });
    
    const validation = schema.validate(req.body);
    if(validation.error) return console.log(validation.error.details[0].message); //res.status(400).send(validation.error.details[0].message);
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    try{
        const user = new User({
            email: req.body.email,
            password: hashPassword,
        });
        const savedUser = await user.save();
        const customer = new Customer({
            id: req.body.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            dateofbirth: req.body.dateofbirth,
            city: req.body.city,
            address: req.body.address,
            phone: req.body.phone,
        });
        const savedCustomer = await customer.save();
        res.send("Done");
    } catch (err){
        res.json({ message:err});
    }
});

router.post('/login', async (req,res) => {
    console.log("login start");
    const schema = Joi.object({email: Joi.string() .min(6) .required() .email(),
        password: Joi.string() .min(6) .required() });
    
    const validation = schema.validate(req.body);
    if(validation.error) return res.status(200).send(validation.error.details[0].message);
    
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(200).send("Email not exists");
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(200).send("Incorrect password");
    try{
        const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
        res.header('auth-token',token).send(token);

    } catch (err){
        res.json({ message:err});
    }
});

module.exports = router;