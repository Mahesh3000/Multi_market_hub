import express from "express";
import { getAllUsers, getProducts } from "../controllers/productController";

const router = express.Router();

// Get all users
router.get("/users", getAllUsers);

router.get("/products", getProducts);

export default router;
