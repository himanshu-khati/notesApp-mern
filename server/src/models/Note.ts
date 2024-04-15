import mongoose, { Document } from "mongoose";
import { UserDocument } from "./User";

// NoteDocument Interface
export interface NoteDocument extends Document {
  title: string;
  description: string;
  isEdited: boolean;
  user: UserDocument["_id"];
  createdAt: Date;
}
// note schema
const noteSchema = new mongoose.Schema<NoteDocument>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Note = mongoose.model<NoteDocument>("Note", noteSchema);
