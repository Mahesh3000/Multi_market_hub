import express from "express";
import storeRoutes from "./routes/storeRoutes";

const app = express();
app.use(express.json());

app.use("/api", storeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
