import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { sendCookies } from "../utils/features";
import { AuthenticatedRequest } from "../middlewares/auth";
import ErrorHandler from "../middlewares/error";

// Register controller
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get data from body
    const { name, email, password } = req.body;
    // Validate
    if (!name || !email || !password) {
      return next(new ErrorHandler("All fields are required", 401));
    }

    // Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists", 409));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save to database
    user = await User.create({ name, email, password: hashedPassword });
  
    // Generate token
    sendCookies(user, res, "Registered successfully", 201);
  } catch (error: any) {
    return next(
      new ErrorHandler(`Error registering user: ${error.message}`, 500)
    );
  }
};

// Login controller
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get data from body
    const { email, password } = req.body;
    // Validate
    if (!email || !password) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    // Get user
    const user = await User.findOne({ email }).select("+password");
    // Validate
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 404));
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    // Validate
    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password", 404));
    }
    // Send cookie and response
    sendCookies(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error: any) {
    return next(new ErrorHandler(`Error logging in: ${error.message}`, 500));
  }
};

// Get user details controller
export const getMyProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return next(
      new ErrorHandler(`Error getting user details: ${error.message}`, 500)
    );
  }
};

// Logout controller
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res
      .status(200)
      .cookie("token", "", { expires: new Date(Date.now()) })
      .json({
        success: true,
        message: `You are now logged out`,
        sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
        secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
      });
  } catch (error: any) {
    return next(new ErrorHandler(`Error logging out: ${error.message}`, 500));
  }
};
