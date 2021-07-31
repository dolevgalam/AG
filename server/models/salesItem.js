const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');
const salesItemSchema = mongoose.Schema({
    name: {
        type : String,
        require : true,
    },
    description: {
        type : String,
        require : true,
    },
    date: {
        type : Date,
        require : true,
        default: Date.now
    },
    picturepath: {
        type : String,
        require : true,
    },
});

module.exports = mongoose.model('salesItem',salesItemSchema);