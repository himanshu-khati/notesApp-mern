"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_js_1 = require("../controller/User.js");
const auth_js_1 = require("../middlewares/auth.js");
const router = express_1.default.Router();
//user routes
router.post("/register", User_js_1.register);
router.post("/login", User_js_1.login);
router.get("/logout", User_js_1.logout);
router.get("/me", auth_js_1.isAuthenticated, User_js_1.getMyProfile);
exports.default = router;
