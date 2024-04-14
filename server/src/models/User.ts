import mongoose, { Document } from "mongoose";

// user document type
export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// user model schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model<UserDocument>("User", userSchema);
