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
exports.authorize = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/user/userModel"));
const protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    // never forget to install cookie parser package
    if (req.cookies) {
        token = req.cookies.jwt;
    }
    if (token) {
        try {
            const jwtSecret = process.env.JWT_SECRET;
            if (jwtSecret) {
                // verify token
                const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
                // get user from the token
                req.user = yield userModel_1.default.findById(decoded.userId).select('-password');
                next();
            }
        }
        catch (err) {
            console.log(err);
            res.status(401);
            throw new Error('Unauthorized: Invalid token');
        }
    }
    else {
        res.status(401);
        throw new Error('Unauthorized: Token required');
    }
}));
exports.protect = protect;
const authorize = (roles) => {
    return (req, res, next) => {
        if (req.user && roles.includes(req.user.role)) {
            next();
        }
        else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
};
exports.authorize = authorize;
