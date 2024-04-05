const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
    {
        representationPic: {
            type: String,
            requred: true
        },
        avatarPic: {
            type: String,
            requred: true
        },
        title: {
            type: String,
            requred: true
        },
        customerRaiting: [{
            _id:false,
            customerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User-data"
            },
            customerRaiting: {
                type: Number,
                default: 0 
            }
        }],
        location: {
            type: String,
            required: true
        },
        workingHrs: {
            type: Number,
            required: true
        },
        menuItems: [{
            _id:false,
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Todo-data",
            }
        }],
        restaurantInfo: {
            type: String,
            required: true
        }

    }
)

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema)

module.exports = RestaurantModel