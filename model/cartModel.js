const mongoose = require("mongoose")
const cartSchema = new mongoose.Schema({

    user_id:{
        type:mongoose.mongo.ObjectId,
        required:true,
    },
    products: [{
        productId: {
            type: mongoose.mongo.ObjectId,
            ref:'Product'
        },
        qty: Number,
    }],
     
},{timestamps:true})

const cartModel = mongoose.model('cart',cartSchema)
module.exports = cartModel;