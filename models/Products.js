const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    weight: {
        type: Number, 
    },
    quantity: {
        type: Number,
    },
    photo: {
        type: String,
    }
})


module.exports = Products = mongoose.model('Products', ProductSchema)