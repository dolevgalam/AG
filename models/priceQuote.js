const mongoose = require('mongoose');
const date = require('../public/pub');
const priceQuoteSchema = mongoose.Schema({
    _id: {
        type : String,
        require : true,
    },
    fullname: {
        type : String,
        require : true,
    },
    customer: {
        type : String,
        require : true,
    },
    date: {
        type : String,
        require : true,
    },
    datenow: {
        type : String,
        require : true,
    },
    saleitem: {
        type : String,
        require : true,
    },
    description: {
        type : String,
        require : true,
    },
    picturepath: {
        type : String,
        require : true,
    },
    canvas: {
        type : String,
        require : true,
    },
    item1: {
        type : String,
    },
    item1_l: {
        type : String,
    },
    item1_w: {
        type : String,
    },
    item2: {
        type : String,
    },
    item2_l: {
        type : String,
    },
    item2_w: {
        type : String,
    },
    hours: {
        type : String,
    },
    price: {
        type : String,
        default : "טרם נקבע"
    },
    status: {
        type : String,
        default : "ממתין לתגובה"
    },
    statusorder: {
        type : String,
        default : "ממתין לביצוע חיתוך"
    },
    
});
const time = {

}
module.exports = mongoose.model('priceQuote',priceQuoteSchema);