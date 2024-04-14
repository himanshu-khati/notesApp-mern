import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// import routes
import userRoutes from "./routes/User";
import noteRoutes from "./routes/Note";
import { errorMiddleware } from "./middlewares/error";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
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
