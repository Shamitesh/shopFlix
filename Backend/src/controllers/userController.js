const userModel = require("../models/userModel");
const { isValid, isValidName, isValidEmail, isValidPhoneNumber } = require("./validator")
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

getUsers = async (req, res) => {
    try {
        let users = await userModel.find();

        if(users.length === 0){
            return res.status(404).json({ msg: "No user Found" })
        }
      
        return res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};

updateUser = async (req, res) => {
    try {
        let userId = req.params.id;

        // User Id Validation
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({msg: "Invalid User Id"})
        }

        let userExists = await userModel.findById(userId)
        if (!userExists) {
            return res.status(404).json({ msg: "No User Found please give correct details" })
        }
        let data = req.body;

        if (Object.keys(data).length === 0) {
            return res.status(400).json({ msg: "Bad Request, No Data Provided" });
        }
        const { name, email, phoneNo, address, age, gender } = data;

        //UserName Validation
        if (name !== undefined) {
            if (!isValid(name)) {
                return res.status(400).json({ msg: "User name is Required" })
            }

            if (!isValidName(name)) {
                return res.status(400).json({ msg: "Invalid user name" })
            }
        }

        // email validation
        if (email!== undefined) {
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
        }

        // phoneNo validation
        if (phoneNo !== undefined) {
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
        }

        // address validation
        if (address !== undefined) {
            if (!isValid(address)) {
                return res.status(400).json({ msg: "address is Required" })
            }
        }

        // gender validation
        if (gender !== undefined) {
            if (!isValid(gender)) {
                return res.status(400).json({ msg: "gender is Required" })
            }
        }

        // age validation
        if (age !== undefined) {
            if (!isValid(age)) {
                return res.status(400).json({ msg: "age is Required" })
            }
        }

        let updatedUser = await userModel.findByIdAndUpdate(userId, data, { new: true });
        return res.status(200).json({ msg: "User  data Updated Successfully", updatedUser });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};

getUsersByGender = async (req, res) => {
     try {
        let gender = req.query.gender;
      // gender validation
        if (!isValid(gender)) {
            return res.status(400).json({ msg: "gender is Required" })
        }
      let users = await userModel.find({gender: gender});

      if(users.length === 0){
            return res.status(404).json({ msg: "No user Found" })
        }
         return res.status(200).json({ users });
     } catch (error) {
         res.status(500).json({ msg: "Internal Server Error", error });
     }

}

deleteUser = async (req, res) => {
    try {
        let userId = req.params.id;
        let deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ msg: "User  Not Found" });
        }
        return res.status(200).json({ msg: "User  Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error", error });
    }
};

module.exports = { addUser, getUsers, updateUser,getUsersByGender, deleteUser }