const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
});

const orderSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    table: Number,
    items: [itemSchema],
    total: Number,
    status: {
        type: String,
        default: 'Received'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;