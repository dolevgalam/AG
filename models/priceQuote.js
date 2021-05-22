const mongoose = require('mongoose');
const date = require('../public/pub');
const priceQuoteSchema = mongoose.Schema({
    _id: {
        type : String,
        require : true,
        default : date.getDate(),
    },
    customer_id: {
        type : String,
        require : true,
    },
    date: {
        type : String,
        require : true,
        default: date.getFullDate(),
    },
    salesitem: {
        type : String,
        require : true,
    },
    description: {
        type : String,
        require : true,
    },
    length: {
        type : String,
        require : true,
    },
    width : {
        type : String,
        require : true,
    },
    height: {
        type : String,
        require : true,
    },
    picturepath: {
        type : String,
        require : true,
    },
    business_days: {
        type : String,
    },
    price: {
        type : String,
    },
    status: {
        type : String,
        default : "בטיפול"
    },
});
const time = {

}
module.exports = mongoose.model('priceQuote',priceQuoteSchema);