const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    adhaar: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    rfid: {
        type: String,
        required: true
    },
    familySize: {
        type: String,
        required: true
    },
    wheatAllotment: {
        type: Number,
        required: true
    },
    riceAllotment: {
        type: Number,
        required: true
    },
    familyIncome: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;