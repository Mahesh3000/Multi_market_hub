import { Request, Response } from "express";
import { prismaClient } from "../db";
import userSchema from "../UserSchema";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid'


export const signup = async (req: Request, res: Response) => {
    try {
        const validate = userSchema.safeParse(req.body);
        if (!validate.success) {
            return res.status(400).json({
                msg: "Invalid request data",
            });
        }
        console.log(validate);
        const { firstname, lastname, email, password, isAdmin } = validate.data;
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);
        const newUser = await prismaClient.user.create({
            data: {
                id: uuidv4(),
                firstname,
                lastname,
                email,
                password: hashedPassword,
                isAdmin: isAdmin ?? false,
            },
        });
        return res.status(201).json({ message: "User Created Successfully", id: newUser.id });
    } catch (error) {
        console.error("Error while saving new user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        console.log("Login");

        const { email, password } = req.body
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })
        console.log(user, "Checking");

        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password);
            console.log(checkPassword);
            if (checkPassword) {
                res.status(200).json({ message: "User Logged in succesfull" })
            }
            else {
                res.status(401).json({
                    message: "Incorrect Password"
                })
            }
        }
        else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        console.error(error, "Internal Error");
    }
}
