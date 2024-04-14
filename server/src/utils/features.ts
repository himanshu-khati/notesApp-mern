import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserDocument } from "../models/User";

export const sendCookies = (
  user: UserDocument,
  res: Response,
  message: string,
  statusCode = 200
) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);
  // send response
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    })
    .json({
      success: true,
      message,
    });
};
