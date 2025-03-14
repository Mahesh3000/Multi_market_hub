import express from "express";
import {
  createProduct,
  getProductsController,
} from "../controllers/productController";
import { uploadSingleFile } from "../middleware/fileUploadMiddleware";

const router = express.Router();

// router.post("/add", uploadSingleFile, createProduct);
// router.get("/products", getProductsController);

router.post("/stores/:storeId/products", uploadSingleFile, createProduct);
router.get("/stores/:storeId/products", getProductsController);

export default router;
