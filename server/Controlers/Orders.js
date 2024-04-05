const OrderModule = require("../models/OrderModel");
const fs = require('fs');
const path = require('path');

module.exports.createOrder = async (req, res, next) => {
    const { orderDetails, userName, phone, totalPrice } = req.body

    try {
        const orderCreated = await OrderModule.create({ orderDetails, userName, phone, totalPrice });

         // Create translations folder if it doesn't exist
         const translationsDir = path.join(__dirname, '..', 'translations');
         if (!fs.existsSync(translationsDir)) {
             fs.mkdirSync(translationsDir);
         }

        // Create language folders (bg and en) if they don't exist
        const bgDir = path.join(translationsDir, 'bg');
        const enDir = path.join(translationsDir, 'en');
        if (!fs.existsSync(bgDir)) {
            fs.mkdirSync(bgDir, { recursive: true });
        }
        if (!fs.existsSync(enDir)) {
            fs.mkdirSync(enDir, { recursive: true });
        }

        // Create order JSON file
        const orderFileName = `orders.json`;
        const orderFilePath = path.join(translationsDir, `${req.headers['accept-language'] === 'bg' ? 'bg' : 'en'}`, orderFileName);
        
        fs.writeFileSync(orderFilePath, JSON.stringify(orderCreated, null, 2));

        res.status(200).json(orderCreated);
        // console.log(orderCreated)

    } catch (err) {
        console.log(err)
    }
}

module.exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await OrderModule.find();
        res.status(201).json(orders)

    } catch (error) {
        console.log(error);
    }
}

module.exports.updateOrder = async (req, res, next) => {
    const { id } = req.body;

    try {
        // const deletedOrder = await OrderModule.findByIdAndDelete(id)
        // console.log(({ deleted: "deleted todo", order: deletedOrder }));
        let updatedOrder = await OrderModule.updateOne(
            { "_id": id }, // Filter
            { $set: { "status": "Delivered" } }, // Update
            { upsert: true } // add document with req.body._id if not exists 

        )
        res.status(200).json({ "updated": updatedOrder })

    } catch (err) {
        res.status(422).json({ failed: "Failed to update" })
    }
}