"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getMyProfile = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const features_1 = require("../utils/features");
const error_1 = __importDefault(require("../middlewares/error"));
const mailSender_1 = require("../utils/mailSender");
// Register controller
const register = async (req, res, next) => {
    try {
        // Get data from body
        const { name, email, password } = req.body;
        // Validate
        if (!name || !email || !password) {
            return next(new error_1.default("All fields are required", 401));
        }
        // Check for existing user
        let user = await User_1.User.findOne({ email });
        if (user) {
            return next(new error_1.default("User already exists", 409));
        }
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Save to database
        user = await User_1.User.create({ name, email, password: hashedPassword });
        // send email
        const mailres = await (0, mailSender_1.mailSender)(email, `welcome to hkNotes`, ` Congratulations ${name} you have successfully regestered with hkNotes`);
        // Generate token
        (0, features_1.sendCookies)(user, res, "Registered successfully", 201);
    }
    catch (error) {
        return next(new error_1.default(`Error registering user: ${error.message}`, 500));
    }
};
exports.register = register;
// Login controller
const login = async (req, res, next) => {
    try {
        // Get data from body
        const { email, password } = req.body;
        // Validate
        if (!email || !password) {
            return next(new error_1.default("All fields are required", 400));
        }
        // Get user
        const user = await User_1.User.findOne({ email }).select("+password");
        // Validate
        if (!user) {
            return next(new error_1.default("Invalid email or password", 404));
        }
        // Match password
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        // Validate
        if (!isMatch) {
            return next(new error_1.default("Invalid email or password", 404));
        }
        // Send cookie and response
        (0, features_1.sendCookies)(user, res, `Welcome back, ${user.name}`, 200);
    }
    catch (error) {
        return next(new error_1.default(`Error logging in: ${error.message}`, 500));
    }
};
exports.login = login;
// Get user details controller
const getMyProfile = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return next(new error_1.default(`Error getting user details: ${error.message}`, 500));
    }
};
exports.getMyProfile = getMyProfile;
// Logout controller
const logout = async (req, res, next) => {
    try {
        res
            .status(200)
            .cookie("token", "", { expires: new Date(Date.now()) })
            .json({
            success: true,
            message: `You are now logged out`,
            sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
            secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
        });
    }
    catch (error) {
        return next(new error_1.default(`Error logging out: ${error.message}`, 500));
    }
};
exports.logout = logout;
