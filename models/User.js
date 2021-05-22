const boolean = require('@hapi/joi/lib/types/boolean');
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    email: {
        type : String,
        require : true,
        max: 255,
        min: 6
    },
    password: {
        type : String,
        require : true,
        max: 1024,
        min: 6
    },
    permission: {
        type : String,
        default: "2"
    },
    date: {
        type : Date,
        default: Date.now
    },
    restore: {
        type : boolean,
        default: false
    }
});

module.exports = mongoose.model('User',UserSchema);