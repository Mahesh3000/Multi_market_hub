"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const db_1 = require("../db"); // Assuming prismaClient is correctly defined
const UserSchema_1 = __importDefault(require("../UserSchema")); // Assuming userSchema is validated properly
// Signup function to create a new user
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Signup");
    try {
        // Validate request body using Zod schema
        const validate = UserSchema_1.default.safeParse(req.body);
        if (!validate.success) {
            return res.status(400).json({
                msg: "Invalid request data",
            });
        }
        const { id, firstname, lastname, email, password, isAdmin } = validate.data;
        // Create a new user using Prisma ORM
        const newUser = yield db_1.prismaClient.user.create({
            data: {
                id,
                firstname,
                lastname,
                email,
                password,
                isAdmin: isAdmin !== null && isAdmin !== void 0 ? isAdmin : false, // Default to false if isAdmin is not provided
            },
        });
        // Send response with user creation success
        return res.status(201).json({ message: "User Created Successfully", id: newUser.id });
    }
    catch (error) {
        console.error("Error while saving new user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.signup = signup;
