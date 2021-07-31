const mongoose = require('mongoose');
const date = require('../public/pub');
const cancelpriceQuoteSchema = mongoose.Schema({
    _id: {
        type : String,
        require : true,
    },
    cancel_date: {
        type : String,
        require : true,
        default: date.getFullDate(),
    },
    reason: {
        type : String,
        require : true,
    },
    description: {
        type : String,
        require : true,
    },
    cancel_by: {
        type : String,
        require : true,
        default : "",
    },
});
const time = {

}
module.exports = mongoose.model('cancelpriceQuote',cancelpriceQuoteSchema);