"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (res, userId) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret) {
        const token = jsonwebtoken_1.default.sign({ userId }, jwtSecret, {
            expiresIn: '1d',
        });
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            // maxAge: 60 * 1000, // 1 minute
        });
    }
    else {
        res.status(400);
        throw new Error('JWT_SECRET environment variable is not defined.');
    }
};
exports.default = generateToken;
