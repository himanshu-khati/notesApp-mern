import app from "./app";
import dotenv from "dotenv";
const connectDatabase = require("./config/database");

dotenv.config();
connectDatabase();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});
