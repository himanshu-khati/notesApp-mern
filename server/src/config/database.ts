const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database connected at port: ${connect.connection.port}`);
  } catch (error: any) {
    console.log(`Error connecting to database: ${(error as Error).message}`);
  }
};

module.exports = connectDatabase;
