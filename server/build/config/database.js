"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const connectDatabase = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected at port: ${connect.connection.port}`);
    }
    catch (error) {
        console.log(`Error connecting to database: ${error.message}`);
    }
};
module.exports = connectDatabase;
