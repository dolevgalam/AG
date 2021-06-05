const mongoose = require('mongoose');
const EmployeeSchema = mongoose.Schema({
    _id: {
        type : String,
        require : true
    },
    firstname: {
        type : String,
        require : true
    },
    lastname: {
        type : String,
        require : true
    },
    email: {
        type : String,
        require : true
    },
    dateofbirth: {
        type : String,
        require : true
    },
    city: {
        type : String,
        require : true
    },
    address: {
        type : String,
        require : true
    },
    phone: {
        type : String,
        require : true
    },
    picturepath: {
        type : String,
        require : true,
    },
    status: {
        type : String,
        default : "פעיל"
    },
});

module.exports = mongoose.model('Employee',EmployeeSchema);