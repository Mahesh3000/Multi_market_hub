import { Request, Response } from "express";
import { prismaClient } from "../db"; // Assuming prismaClient is correctly defined
import userSchema from "../UserSchema"; // Assuming userSchema is validated properly

// Signup function to create a new user
export const signup = async (req: Request, res: Response) => {
    console.log("Signup");

    try {
        // Validate request body using Zod schema
        const validate = userSchema.safeParse(req.body);
        if (!validate.success) {
            return res.status(400).json({
                msg: "Invalid request data",
            });
        }

        const { id, firstname, lastname, email, password, isAdmin } = validate.data;

        // Create a new user using Prisma ORM
        const newUser = await prismaClient.user.create({
            data: {
                id,
                firstname,
                lastname,
                email,
                password,
                isAdmin: isAdmin ?? false, // Default to false if isAdmin is not provided
            },
        });

        // Send response with user creation success
        return res.status(201).json({ message: "User Created Successfully", id: newUser.id });
    } catch (error) {
        console.error("Error while saving new user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
