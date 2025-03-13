import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send(`PRODUCT SERVICE IS RUNNING AT ${PORT}`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
