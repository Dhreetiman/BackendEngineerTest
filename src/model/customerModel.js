const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    mobileNumber: {type: String, required: true, unique: true},
    DOB: {type: Date},
    emailID: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    customerID: {type: String, required: true, unique: true},
    status: {type: String, default: 'ACTIVE', enum: ["ACTIVE", "INACTIVE"]}
}, {timestamps: true}) 

module.exports = mongoose.model('Customer', customerSchema)