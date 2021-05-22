const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../models/User');

module.exports =  function (ResourcePermission) {
    //console.log("ResourcePermission");
    return async (req,res,next) => {
        const token = req.header('auth-token');
        if(!token) return res.status(401).send("Access Denied");
        try{
            const verified = jwt.verify(token,process.env.TOKEN_SECRET);
            const user = await User.findById(verified);
            console.log(req.params.specific);
            console.log(verified._id);
            if((ResourcePermission > user.permission)&&(verified._id!=req.params.specific)) throw new Error('Invalid Permisson');
            req.user = verified;
            next();
        } catch(err) {
            if(!err) res.status(400).send('Invalid Token');
            res.status(400).send(err.message);
        }
    }

}
