"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailSender = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const error_1 = __importDefault(require("../middlewares/error"));
const mailSender = async (email, title, body) => {
    try {
        const tansporter = nodemailer_1.default.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        const info = await tansporter.sendMail({
            from: `hkNotes`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        return info;
    }
    catch (error) {
        throw new error_1.default("Error sending email", 500);
    }
};
exports.mailSender = mailSender;
