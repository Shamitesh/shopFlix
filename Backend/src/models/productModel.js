const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: true,
        trim: true
    },
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productDescription: {
        type: String,
        required: true,
        trim: true
    },
    productCategory: {
        type: String,
        enum: ["laptop", "grocery", "mobile", "clothes", "furniture", "toys", "books", "electronics", "home appliances",
            "beauty", "sports", "automotive", "jewelry", "footwear", "stationery", "health",],
        required: true,
        trim: true
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productRatings: {
        type: Number,
        required: true
    },
    isFreeDelivery: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    })

const productModel = mongoose.model("productDetails", productSchema);

module.exports = productModel;