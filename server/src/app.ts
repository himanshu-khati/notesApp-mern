import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// import routes
import userRoutes from "./routes/User";
import noteRoutes from "./routes/Note";
import { errorMiddleware } from "./middlewares/error";

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "";
// Middlewares
app.use(
  cors({
    origin: [FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Mount routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/notes", noteRoutes);

// Default route
app.get("/", (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "API server is up and running",
  });
});

app.use(errorMiddleware);

export default app;
