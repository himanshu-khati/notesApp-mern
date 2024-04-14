"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getMyProfile = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const features_1 = require("../utils/features");
//  register controller
const register = async (req, res) => {
    try {
        // get data from body
        const { name, email, password } = req.body;
        // validate
        if (!name || !email || !password) {
            return res.status(404).json({
                success: false,
                message: `all fields are required`,
            });
        }
        // check for existing user
        let user = await User_1.User.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: `user already exists`,
            });
        }
        // hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // save to database
        user = await User_1.User.create({ name, email, password: hashedPassword });
        console.log("user: ", user);
        // generate token
        (0, features_1.sendCookies)(user, res, "registered successfully", 201);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `something went wrong while registering user: ${error.message}`,
        });
    }
};
exports.register = register;
// login controller
const login = async (req, res) => {
    try {
        // get data from body
        const { email, password } = req.body;
        // validate
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: `all fields are required`,
            });
        }
        // get user
        const user = await User_1.User.findOne({ email }).select("+password");
        // validate
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `invalid email or password`,
            });
        }
        // match password
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        // validate
        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: `invalid email or password`,
            });
        }
        // send cookie and response
        (0, features_1.sendCookies)(user, res, `Welcome back, ${user.name}`, 200);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `something went wrong while logging in: ${error.message} `,
        });
    }
};
exports.login = login;
// get user details controller
const getMyProfile = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `something went wrong getting user details: ${error.message}`,
        });
    }
};
exports.getMyProfile = getMyProfile;
// logout controller
const logout = async (req, res) => {
    try {
        res
            .status(200)
            .cookie("token", "", { expires: new Date(Date.now()) })
            .json({
            success: true,
            message: `you are now logged out`,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: `something went wrong while logging out: ${error.message} `,
        });
    }
};
exports.logout = logout;
