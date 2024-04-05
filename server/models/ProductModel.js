const mongoose=require('mongoose')

const ProductData = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        text: {
            type: String,
           required: true,
        },
        todoImage:{
            type:String,
            required: true,
        },
        category:{
            type:String,
            required: true,
        },
        price:{
            type:Number,
            required:true
        },
    
    })

const ProductModel = mongoose.model('Todo-data', ProductData)

module.exports=ProductModel;