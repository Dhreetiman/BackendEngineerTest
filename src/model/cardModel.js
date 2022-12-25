const mongoose = require('mongoose')

const card = new mongoose.Schema({
    cardNumber: {
        type: String,
        required: true,
    },
    cardType: {
        type: String,
        required: true,
        enum: ["REGULAR", "SPECIAL"]
    },
    customerName: {
        type: String,
    
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    },
    vision: {
        type: String
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    }
})


module.exports = mongoose.model('Card',card)