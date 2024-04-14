"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDatabase = require("./config/database");
dotenv_1.default.config();
connectDatabase();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV;
app_1.default.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT} in ${NODE_ENV} mode`);
});
