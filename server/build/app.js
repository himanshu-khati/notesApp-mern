"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import routes
const User_1 = __importDefault(require("./routes/User"));
const Note_1 = __importDefault(require("./routes/Note"));
const error_1 = require("./middlewares/error");
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Mount routes
app.use("/api/v1/auth", User_1.default);
app.use("/api/v1/notes", Note_1.default);
// Default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "API server is up and running",
    });
});
app.use(error_1.errorMiddleware);
exports.default = app;
