import express from "express";
import { signup } from "../controllers/userController"; // Assuming your controller is in this file
const router = express.Router();

// Define the signup route
router.post('/signup', signup);

export default router;
