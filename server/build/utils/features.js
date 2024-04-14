"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCookies = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendCookies = (user, res, message, statusCode = 200) => {
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_SECRET);
    // send response
    res
        .status(statusCode)
        .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
        sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    })
        .json({
        success: true,
        message,
    });
};
exports.sendCookies = sendCookies;
