const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');
const CustomerSchema = mongoose.Schema({
    id: {
        type : String,
        require : true,
        max: 9,
        min: 9
    },
    firstname: {
        type : String,
        require : true,
        max: 20,
        min: 2
    },
    lastname: {
        type : String,
        require : true,
        max: 20,
        min: 2
    },
    email: {
        type : String,
        require : true,
        max: 20,
        min: 2
    },
    dateofbirth: {
        type : Date,
        default: false,
        require : true
    },
    city: {
        type : String,
    },
    address: {
        type : String,
    },
    phone: {
        type : String,
    },
    

});

module.exports = mongoose.model('Customer',CustomerSchema);