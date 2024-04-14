"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// user model schema
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        select: false,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.User = mongoose_1.default.model("User", userSchema);
