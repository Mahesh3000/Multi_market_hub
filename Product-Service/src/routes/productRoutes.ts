import express from "express";
import { getAllUsers } from "../controllers/productController";

const router = express.Router();

// Get all users
router.get("/users", getAllUsers);

export default router;
