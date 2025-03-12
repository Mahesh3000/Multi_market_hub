import express from "express";
import routes from '../src/routes/Routes.js';
import cookie from "cookie-parser";
import { signup } from "./controllers/userController.js";
const router = express.Router();
const app = express();
app.use(express.json());
app.use(cookie());
app.post('/signup', signup)
const port = 3006;
app.listen(port, () => console.log(`server running on ${port}`))