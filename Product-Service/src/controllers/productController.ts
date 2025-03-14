import { Request, Response } from "express";
import { Product } from "../models/productmodel"; // Import your Product interface
import { addProduct, getProducts } from "../services/productservices";
import { uploadFileToS3 } from "../services/fileUploadService";

export const createProduct = async (req: Request, res: Response) => {
  try {
    let imageUrl: string | undefined = undefined;

    if (req.file) {
      imageUrl = await uploadFileToS3(req.file);
      console.log("imageUrl", imageUrl);
    }

    const productData: Product = {
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      stock_quantity: parseInt(req.body.stock_quantity),
      image_url: imageUrl,
      store_id: req.body.store_id,
    };

    const newProduct = await addProduct(productData);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params;
    const products = await getProducts(storeId);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
};
