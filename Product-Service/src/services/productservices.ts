import pool from "../config/db";
import { Product } from "../models/productmodel";

export const addProduct = async (product: Product) => {
  const { name, description, price, stock_quantity, image_url } = product;

  const query = `
    INSERT INTO products (name, description, price, stock_quantity, image_url)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [name, description, price, stock_quantity, image_url];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const getProducts = async (): Promise<Product[]> => {
  const query = "SELECT * FROM products"; // Fetch all products from the products table
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
