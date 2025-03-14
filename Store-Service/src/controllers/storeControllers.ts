import { Request, Response } from "express";
import { Store } from "../models/storeModel";
import {
  addStore,
  fetchAllStores,
  fetchStoreById,
  //   modifyStore,
  //   removeStore,
  //   fetchStoreByName,
} from "../services/storeService";

export const createStore = async (req: Request, res: Response) => {
  try {
    const storeData: Store = {
      name: req.body.name,
      description: req.body.description,
    };

    const newStore = await addStore(storeData);
    res.status(201).json({ success: true, data: newStore });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create store" });
  }
};

export const getAllStores = async (req: Request, res: Response) => {
  try {
    const stores = await fetchAllStores();
    res.status(200).json({ success: true, data: stores });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch stores" });
  }
};

export const getStoreById = async (req: Request, res: Response) => {
  try {
    const store = await fetchStoreById(req.params.id);
    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Store not found" });
    }
    res.status(200).json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch store" });
  }
};

// export const updateStore = async (req: Request, res: Response) => {
//   try {
//     const updatedStore = await modifyStore(req.params.id, req.body);
//     res.status(200).json({ success: true, data: updatedStore });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to update store" });
//   }
// };

// export const deleteStore = async (req: Request, res: Response) => {
//   try {
//     await removeStore(req.params.id);
//     res.status(200).json({ success: true, message: "Store deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to delete store" });
//   }
// };

// export const getStoreByName = async (req: Request, res: Response) => {
//   try {
//     const store = await fetchStoreByName(req.params.resourceName);
//     if (!store) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Store not found" });
//     }
//     res.status(200).json({ success: true, data: store });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Failed to fetch store" });
//   }
// };
