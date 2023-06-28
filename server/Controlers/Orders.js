const OrderModule = require("../models/OrderModel");

module.exports.createOrder = async (req, res, next) => {
    //  const { text ,title ,createdBy,picture} = req.body
    //TodoD.create({ text ,title ,createdBy,picture});
    const {  orderDetails ,userName , phone} = req.body

    try {
        const orderCreated = await OrderModule.create({orderDetails,userName , phone});
        res.status(200).json(orderCreated)
        console.log(orderCreated)

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
     let updatedOrder= await OrderModule.updateOne(
        { "_id": id}, // Filter
        {$set: {"status": "Delivered"}}, // Update
        {upsert: true} // add document with req.body._id if not exists 

   )
   res.status(200).json({"updated":updatedOrder})

    } catch (err) {
        res.status(422).json({ failed: "failed to update" })
    }
}