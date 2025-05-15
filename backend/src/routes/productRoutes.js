const express = require("express");
const {getUserProducts,getProductByID,createNewProduct,updateProduct,deleteProduct,analyze} = require("../controllers/productController.js");
const protect = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/getUserProducts", protect, getUserProducts);
router.get("/getProductByID/:id", protect, getProductByID);
router.post("/createNewProduct", protect, createNewProduct);
router.put("/updateProduct", protect, updateProduct);
router.delete("/deleteProduct/:id", protect, deleteProduct);
router.get("/analyze/:id", protect, analyze);

module.exports = router;
