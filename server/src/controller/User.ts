import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User, UserDocument } from "../models/User";
import { sendCookies } from "../utils/features";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthenticatedRequest } from "../middlewares/auth";

//  register controller
export const register = async (req: Request, res: Response) => {
  try {
    // get data from body
    const { name, email, password } = req.body;
    // validate
    if (!name || !email || !password) {
      return res.status(404).json({
        success: false,
        message: `all fields are required`,
      });
    }
    // check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: `user already exists`,
      });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // save to database
    user = await User.create({ name, email, password: hashedPassword });
    console.log("user: ", user);
    // generate token
    sendCookies(user, res, "registered successfully", 201);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `something went wrong while registering user: ${
        (error as Error).message
      }`,
    });
  }
};

// login controller
export const login = async (req: Request, res: Response) => {
  try {
    // get data from body
    const { email, password } = req.body;
    // validate
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: `all fields are required`,
      });
    }
    // get user
    const user = await User.findOne({ email }).select("+password");
    // validate
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `invalid email or password`,
      });
    }
    // match password
    const isMatch = await bcrypt.compare(password, user.password);
    // validate
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: `invalid email or password`,
      });
    }
    // send cookie and response
    sendCookies(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `something went wrong while logging in: ${
        (error as Error).message
      } `,
    });
  }
};

// get user details controller

export const getMyProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `something went wrong getting user details: ${
        (error as Error).message
      }`,
    });
  }
};

// logout controller
export const logout = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .cookie("token", "", { expires: new Date(Date.now()) })
      .json({
        success: true,
        message: `you are now logged out`,
      });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `something went wrong while logging out: ${
        (error as Error).message
      } `,
    });
  }
};
