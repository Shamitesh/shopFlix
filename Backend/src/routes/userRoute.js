const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const productController = require('../controllers/productController')

router.post("/addUser", userController.addUser );
router.get("/getUsers", userController.addUser );
router.put("/updateUser/:id", userController.addUser );
router.delete("/deleteUser/:id", userController.deleteUser );
router.post("/addProduct", productController.addProduct);

module.exports = router;