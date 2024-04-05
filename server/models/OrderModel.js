const mongoose = require('mongoose')

const OrderData = new mongoose.Schema(
    {
        orderDetails: {
            type: Array,
            required: [true, "order details are required"],
        },
        userName: {
            type: String,
            required: [true, "user name is required"]
        },
        phone: {
            type: Number,
            require: [true, "phone is required"]
        },
        totalPrice: {
            type: Number,
            require: [true, "totalPrice is required"]
        },
        status: {
            type: String,
            default: "in-progress"
        },
       
    })

const OrderModule = mongoose.model('order-data', OrderData)

module.exports = OrderModule;