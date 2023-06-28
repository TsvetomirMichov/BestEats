const ProductModel = require("../models/ProductModel")
var fs = require('fs');
module.exports.createProduct = async (req, res, next) => {
    //  const { text ,title ,createdBy,picture} = req.body
    //TodoD.create({ text ,title ,createdBy,picture});
    const newPost = new ProductModel(req.body)

    try {
        const textSended = await newPost.save();
        res.status(200).json(textSended)

    } catch (err) {
        console.log(err)
    }
}
module.exports.readProduct = async (req, res, next) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products)

    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    const { id } = req.body;

    try {
        const delTodo = await ProductModel.findByIdAndDelete(id)
        if (delTodo) {
            res.status(200).json({ "Deleted successfully": delTodo });
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
        // console.log(({ deleted: "deleted todo", todo: delTodo }));
    } catch (err) {
        console.log(err);
    }
}

module.exports.updateProduct = async (req, res, next) => {

    const { id, title, text, todoImage, category, price } = req.body;

    try {
        // Confirm data
        if (!id || !text || !title || !category || !price || !todoImage) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        // Confirm note exists to update
        const recepi = await ProductModel.findById(id).exec()

        if (!recepi) {
            return res.status(400).json({ message: 'Note not found' })
        }

        // Check for duplicate title
        const duplicate = await ProductModel.findOne({ title })

        // Allow renaming of the original note 
        if (duplicate) {
            return res.status(409).json({ message: 'Duplicate note title' })
        }

        recepi.title = title
        recepi.text = text
        recepi.category = category
        recepi.price = price
        recepi.price = price

        const updatedProduct = await recepi.save()

        res.status(200).json(`'${updatedProduct}' updated`)

    } catch (err) {
        console.log(err)
    }
}

module.exports.getSingleProduct = async (req, res, next) => {
    const { id } = req.body;

    try {
        const readSingle = await ProductModel.findById(id);
        res.status(200).json(readSingle)

    } catch (err) {
        console.log(err)
    }
}
