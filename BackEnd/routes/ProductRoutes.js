import express from "express";
//import { Router } from "express";
import { getAllProducts,createProduct,getProduct,updateProduct,deleteProduct } from "../controllers/ProductControllers.js";

const router=express.Router()

router.get("/products",getAllProducts)
router.get("/products/:id",getProduct)
router.post("/products/create_product",createProduct)
router.put("/products/:id",updateProduct)
router.delete("/products/:id",deleteProduct)
export default router