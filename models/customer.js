const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                var phoneRegex = /\d{3}-\d{3}-\d{4}/;
                return (v == null || v.trim().length < 1) || phoneRegex.test(v)
            },
            message: 'Provided phone number is invalid.'
        },
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().regex(/\d{3}-\d{3}-\d{4}/)
    };

    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;