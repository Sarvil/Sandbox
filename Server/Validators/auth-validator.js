const { z } = require("zod");

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid Email address" })
        .min(3, { message: "Email must be of atleast 3 characters." })
        .max(255, { message: "Email must not be more than 255 characters" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(7, { message: "Password must be of atleast 7 characters." })
        .max(256, { message: "Password must not be more than 256 characters" }),
});

const singupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be of atleast 3 characters." })
        .max(255, { message: "Name must not be more than 255 characters" }),
    phoneNo: z
        .string({ required_error: "Phone Number is required" })
        .trim()
        .min(10, { message: "Phone Number must be of atleast 10 characters." })
        .max(20, { message: "Phone Number must not be more than 20 characters" }),
});

module.exports = { singupSchema, loginSchema };