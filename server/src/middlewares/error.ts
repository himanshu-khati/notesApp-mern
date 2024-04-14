import express, { NextFunction, Request, Response } from "express";

// custom error handler class
class ErrorHandler extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// middleware for error handeling
export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
