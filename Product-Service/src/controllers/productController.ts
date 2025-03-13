import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // const users = await prisma.user.findMany();
    // res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};
