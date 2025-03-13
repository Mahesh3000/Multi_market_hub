import { Request, Response } from "express";
import { prismaClient } from "../db";
import userSchema from "../UserSchema";
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const secret = process.env.SECRET_KEY as string

export const signup = async (req: Request, res: Response) => {
    try {
        // Sanitizes and checks the schema from the user with the defined schema
        const validate = userSchema.safeParse(req.body);
        if (!validate.success) {
            return res.status(400).json({
                msg: "Invalid request data",
            });
        }
        console.log(validate);
        const { firstname, lastname, email, password, isAdmin } = validate.data;
        const saltRounds = 10

        // Hashing the password using bcrypt library
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);
        // Creating the user in teh database
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
        // Validates whether user exists in the database
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })
        console.log(user, "Checking");
        if (user) {
            // Verifies the password sent by the user and the pswd saved in teh database
            const checkPassword = await bcrypt.compare(password, user.password);
            console.log(checkPassword);
            if (checkPassword) {
                const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
                res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
                res.status(200).json({ message: "User Logged in succesfull" });
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

export const landingPage = (req: Request, res: Response) => {
    const token = req.cookies.token;
    try {
        const verifyToken = jwt.verify(token, secret);
        if (verifyToken) {
            res.status(200).json({ message: "Welcome to landing page" });
        }
    } catch (error) {
        console.error(error, "While landing into Home page");
    }
}