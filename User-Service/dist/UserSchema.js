"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    id: zod_1.z.string(),
    firstname: zod_1.z.string().min(2, "Name must be 2 characters long"),
    lastname: zod_1.z.string(),
    email: zod_1.z.string().email("Invalid Email Format"),
    password: zod_1.z.string(),
    isAdmin: zod_1.z.boolean().optional(),
});
exports.default = userSchema;
