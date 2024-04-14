import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Import routes
// const nameRoutes = require("./routes/name");

// Mount routes
// app.use("/api/v1/name", nameRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "Notes server is up and running",
  });
});

export default app;
