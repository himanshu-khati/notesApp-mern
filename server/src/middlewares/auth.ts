import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User, UserDocument } from "../models/User";

// AuthenticatedRequest interface
export interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

// auth middleware
export const isAuthenticated = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: `please login`,
      });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Invalid or expired token`,
    });
  }
};
