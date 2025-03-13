import express from "express";
import {
  createProduct,
  getProductsController,
  //   getAllUsers,
  //   getProducts,
} from "../controllers/productController";
// import upload from "../middleware/upload";
import { uploadSingleFile } from "../middleware/fileUploadMiddleware";

const router = express.Router();

router.post("/add", uploadSingleFile, createProduct);
router.get("/products", getProductsController);

export default router;
