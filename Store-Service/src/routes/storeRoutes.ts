import express from "express";
import {
  createStore,
  getAllStores,
  getStoreById,
  //   updateStore,
  //   deleteStore,
  //   getStoreByName,
} from "../controllers/storeControllers";

const router = express.Router();

router.post("/stores", createStore); // Create a store
router.get("/stores", getAllStores); // Get all stores
// router.get("/stores/:id", getStoreById); // Get store by ID
// router.put("/stores/:id", updateStore); // Update store by ID
// router.delete("/stores/:id", deleteStore); // Delete store by ID
// router.get("/storeName/:resourceName", getStoreByName); // Get store by name

export default router;
