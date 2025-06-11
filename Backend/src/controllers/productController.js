const mongoose = require("mongoose");
const productModel = require("../models/productModel");
const { isValid, isValidProductName } = require("../validation/validation")

const addProduct = async (req, res) => {
    try {
        let data = req.body;

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ msg: "Bad Request, No Data Provided" });
        }

        const { productName, productImage, productDescription, productCategory,
                productPrice, productRatings, isFreeDelivery } = data;

        if (!isValid(productImage)) {
            return res.status(400).json({ msg: "Product image is required" });
        }

        if (!isValid(productName)) {
            return res.status(400).json({ msg: "Product name is required" });
        }

        if (!isValidProductName(productName)) {
            return res.status(400).json({ msg: "Invalid product name" });
        }

        if (!isValid(productDescription)) {
            return res.status(400).json({ msg: "Product description is required" });
        }

        if (!isValid(productCategory)) {
            return res.status(400).json({ msg: "Product category is required" });
        }

        const allowedCategories = [
            "laptop", "grocery", "mobile", "clothes", "furniture", "toys",
            "books", "electronics", "home appliances", "beauty", "sports",
            "automotive", "jewelry", "footwear", "stationery", "health"
        ];

        if (!allowedCategories.includes(productCategory)) {
            return res.status(400).json({ msg: "Invalid product category." });
        }

        if (!isValid(productPrice) || isNaN(productPrice) || Number(productPrice) <= 0) {
            return res.status(400).json({ msg: "Valid product price is required" });
        }

        if (productRatings !== undefined) {
            if (isNaN(productRatings) || productRatings < 0 || productRatings > 5) {
                return res.status(400).json({ msg: "Product ratings must be between 0 and 5" });
            }
        }

        if (typeof isFreeDelivery !== "boolean") {
            return res.status(400).json({ msg: "isFreeDelivery must be true or false" });
        }

        const productData = await productModel.create(data);
        return res.status(201).json({ msg: "Product added successfully", productData });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", error });
    }
}

const getAllProducts = async (req, res) => {

}

const getProductById = async (req, res) => {

}

const getProductByCategory = async (req, res) => {

}


module.exports = { addProduct, getAllProducts, getProductById, getProductByCategory };