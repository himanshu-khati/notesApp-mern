"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
// auth middleware
const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: `please login`,
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not found",
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: `Invalid or expired token`,
        });
    }
};
exports.isAuthenticated = isAuthenticated;
