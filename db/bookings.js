const mongoose = require('mongoose');


const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    viechle:String,
    service: String,
    contact:Number,

})

module.exports = mongoose.model('bookings', Schema);