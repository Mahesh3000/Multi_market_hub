import { Request, Response } from "express";
import { Product } from "../models/productmodel";
import { addProduct, getProducts } from "../services/productservices";
import { uploadFileToS3 } from "../services/fileUploadService";

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
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
      store_id: req.params.storeId, // Assuming storeId is passed in URL params
    };

    const newProduct = await addProduct(productData);

    if (req.file) {
      const storeId = req.params.storeId;
      const productId = newProduct.id;

      imageUrl = await uploadFileToS3(req.file, storeId, productId);
      console.log("imageUrl", imageUrl);

      newProduct.image_url = imageUrl;
    }

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};

export const getProductsController = async (
  req: Request,
  res: Response
): Promise<void> => {
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
