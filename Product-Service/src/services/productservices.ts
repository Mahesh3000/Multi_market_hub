import pool from "../config/db";
import { Product } from "../models/productmodel";

export const addProduct = async (product: Product) => {
  const { name, description, price, stock_quantity, image_url, store_id } =
    product;

  const query = `
    INSERT INTO products (name, description, price, stock_quantity, image_url,store_id)
    VALUES ($1, $2, $3, $4, $5,$6)
    RETURNING *;
  `;

  const values = [
    name,
    description,
    price,
    stock_quantity,
    image_url,
    store_id,
  ];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const getProducts = async (storeId: string) => {
  const query = `
    SELECT * FROM products WHERE store_id = $1;
  `;

  const values = [storeId];

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching products for store:", error);
    throw error;
  }
};
