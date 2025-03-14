import pool from "../config/db";
import { Store } from "../models/storeModel";
// import { v4 as uuidv4 } from "uuid";

export const addStore = async (storeData: Store) => {
  //   const storeId = uuidv4();
  console.log("storeData", storeData);

  const query = `
    INSERT INTO stores (name, description)
    VALUES ($1, $2) RETURNING *;
  `;

  const values = [storeData.name, storeData.description];
  console.log(query);

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const fetchAllStores = async () => {
  const query = `SELECT * FROM stores;`;
  const result = await pool.query(query);
  return result.rows;
};

export const fetchStoreById = async (id: string) => {
  const query = `SELECT * FROM stores WHERE id = $1;`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

// export const modifyStore = async (id: string, storeData: Partial<Store>) => {
//   const query = `
//     UPDATE stores SET name = $1, description = $2, updated_at = NOW()
//     WHERE id = $3 RETURNING *;
//   `;

//   const values = [storeData.name, storeData.description, id];

//   const result = await pool.query(query, values);
//   return result.rows[0];
// };

// export const removeStore = async (id: string) => {
//   const query = `DELETE FROM stores WHERE id = $1;`;
//   await pool.query(query, [id]);
// };

// export const fetchStoreByName = async (name: string) => {
//   const query = `SELECT * FROM stores WHERE name = $1;`;
//   const result = await pool.query(query, [name]);
//   return result.rows[0];
// };
