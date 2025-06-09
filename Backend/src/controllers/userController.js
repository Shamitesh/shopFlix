const userModel = require("../models/userModel");
const { isValid, isValidName, isValidEmail, isValidPhoneNumber, } = require("../validation/validation")
const mongoose = require("mongoose")


addUser = async (req, res) => {
    try {
        let data = req.body;

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ msg: "Bad Request, No Data Provided" });
        }
        const { name, email, phoneNo, address, age, gender } = data;

        //UserName Validation
        if (!isValid(name)) {
            return res.status(400).json({ msg: "User name is Required" })
        }

        if (!isValidName(name)) {
            return res.status(400).json({ msg: "Invalid user name" })
        }

        // email validation
        if (!isValid(email)) {
            return res.status(400).json({ msg: "User name is Required" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({ msg: "Invalid email" })
        }
        let duplicateEmail = await userModel.findOne({ email })

        if (duplicateEmail) {
            return res.status(400).json({ msg: "Email Already Exists" })
        }

        // phoneNo validation
        if (!isValid(phoneNo)) {
            return res.status(400).json({ msg: "Phone number is Required" })
        }

        if (!isValidPhoneNumber(phoneNo)) {
            return res.status(400).json({ msg: "Invalid phoneNumber" })
        }

        let dupllicatePhoneNo = await userModel.findOne({ phoneNo })

        if (dupllicatePhoneNo) {
            return res.status(400).json({ msg: "Phone Number is Already Exists" })
        }

        // address validation
        if (!isValid(address)) {
            return res.status(400).json({ msg: "address is Required" })
        }

        // gender validation
        if (!isValid(gender)) {
            return res.status(400).json({ msg: "gender is Required" })
        }

        // age validation
        if (!isValid(age)) {
            return res.status(400).json({ msg: "age is Required" })
        }

        let userData = await userModel.create(data);
        return res.status(201).json({ msg: "User  Added Successfully", userData });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};



module.exports = { addUser}