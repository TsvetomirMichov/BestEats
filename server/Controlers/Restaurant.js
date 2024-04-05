const { response } = require("express");
const RestaurantModel = require("../models/RestaurantModel");

module.exports.createRestaurant = async (req, res, next) => {

    const {
        representationPic, avatarPic,
        title,
        location, workingHrs,
        menuItems, restaurantInfo
    } = req.body

    try {
        const newRestaurant = new RestaurantModel({
            representationPic,
            avatarPic,
            title,
            location,
            workingHrs,
            menuItems,
            restaurantInfo
        });
        const savedRestaurant = await newRestaurant.save()

        res.status(200).json(savedRestaurant);

    } catch (err) {
        console.log(err)
        res.json({ "Error ocurred in creating new restaurant:": err });
    }
}

module.exports.getRestaurant = async (req, res, next) => {

    try {
        const restaurant = await RestaurantModel.
            find().
            populate("customerRaiting.customerId").
            populate("menuItems.productId").
            exec();
        // prints "The author is Ian Fleming"
        // console.log('The restaurant is', restaurant);
        res.status(200).json(restaurant)
    } catch (err) {
        console.log(err)
    }
}

module.exports.getSingleRestaurant = async (req, res, next) => {
    const { id } = req.params

    try {
        const restaurant = await RestaurantModel.
            findById(id).
            populate("customerRaiting.customerId").
            populate("menuItems.productId").
            exec();

        res.status(200).json(restaurant)
    } catch (err) {
        console.log(err)
    }
}

module.exports.getRestaurantsMunuItems = async (req, res, next) => {
    try {

        let result = await RestaurantModel.aggregate(
            [
                { $project: { title: 1, menuItems: 1 } },
                {
                    $unwind: {
                        path: '$menuItems',
                        preserveNullAndEmptyArrays: true
                    }
                }
            ],
            { maxTimeMS: 60000, allowDiskUse: true }
        )

        const populateQuery = [
            {
                path: 'menuItems.productId'
            },

        ];

        result = await RestaurantModel.populate(result, populateQuery)

        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ "Error": err })
    }
}

module.exports.deleteRestaurant = async (req, res, next) => {
    const { id } = req.params
    try {
        const restaurantToDelte = await RestaurantModel.findByIdAndDelete(id)
        if (restaurantToDelte) {
            res.status(200).json({ "Deleted successfully": delTodo });
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    } catch (err) {

    }
}

module.exports.createUserRestaurantRaiting = async (req, res, next) => {
    const { customerId, customerRaiting } = req.body
    const { id } = req.params

    try {
        let updateValueObject = {
            "customerId": customerId,
            "customerRaiting": customerRaiting,
        }

        let updated
        if (updateValueObject && id) {
            updated = await RestaurantModel.findOneAndUpdate(
                { _id: id },
                {
                    $push: {
                        customerRaiting: updateValueObject

                    }
                }
            )
        }
        if (updated) {
            // res.status(200).json({ "Deleted successfully": delTodo });
            res.status(200).json({ "Updated successfully": updated });
        } else {
            res.status(400).json({ error: "Todo not found" });
        }

    } catch (err) {
        res.status(404).json({ error: err.message });

    }
}

module.exports.updateRestaurant = async (req, res, next) => {
    const {
        id, representationPic, avatarPic,
        title,
        location, workingHrs,
        menuItems, restaurantInfo } = req.body
    try {
        if (!id || !representationPic || !avatarPic || !location || !menuItems || !restaurantInfo || !workingHrs || !restaurantInfo) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // // Confirm note exists to update
        const restaurant = await RestaurantModel.findById(id).exec()

        if (!restaurant) {
            return res.status(400).json({ message: 'Note not found' })
        }

        // Check for duplicate title
        const duplicate = await RestaurantModel.findOne({
            representationPic, avatarPic,
            title,
            restaurantInfo
        })

        // Allow renaming of the original note 
        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate note title' })
        }

        restaurant.title = title
        restaurant.representationPic = representationPic
        restaurant.avatarPic = avatarPic
        restaurant.location = location
        restaurant.menuItems = menuItems
        restaurant.restaurantInfo = restaurantInfo
        restaurant.workingHrs=workingHrs

        const updatedRestaurant = await restaurant.save()

        res.status(200).json(`'${updatedRestaurant}' updated`)

    } catch (err) {
        res.json(err)
    }
}
