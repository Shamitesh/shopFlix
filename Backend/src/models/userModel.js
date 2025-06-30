
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
         type: String, 
         required: true, 
         trim: true 
        },
    email: {
         type: String, 
         required: true, 
         unique: true,
         trim: true 
        },
    password: {
        type: String,
        required: true,
        trim: true
    },
    contactNo: {
            type: Number, 
            required: true,
             unique: true,
             trim: true 
        },
    address: {
         type: String, 
         required: true, 
         trim: true 
        },
    age: { 
        type: Number, 
        required: true 
    },
    gender: {
        type: String,
         enum: ["male","female","other"],
          required: true, 
          trim: true 
        }},
        {
            timestamps: true,
        },
    );

const userModel = new mongoose.model("user-details",userSchema)

module.exports = userModel;