import { NextFunction, Response } from "express";
import { Note } from "../models/Note";
import { AuthenticatedRequest } from "../middlewares/auth";
import ErrorHandler from "../middlewares/error";

// Add new note
export const newNote = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Fetch data from body
    const { title, description } = req.body;
    // Validate
    if (!title || !description)
      return next(new ErrorHandler("All fields are required", 400));
    // Get user
    const user = req.user;
    // Create note
    const note = await Note.create({
      title,
      description,
      user: user,
    });
    // Return response
    res.status(201).json({
      success: true,
      message: `Note added successfully`,
      note,
    });
  } catch (error: any) {
    next(new ErrorHandler(`Error adding a new note: ${error.message}`, 500));
  }
};

// Get all notes
export const getAllNotes = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) return next(new ErrorHandler("User not found", 401));
    const userId = user._id;
    const notes = await Note.find({ user: userId });
    if (notes.length === 0)
      return next(new ErrorHandler("No notes found for the user", 404));
    res.status(200).json({
      success: true,
      message: `All notes fetched successfully`,
      notes,
    });
  } catch (error: any) {
    next(new ErrorHandler(`Error fetching notes: ${error.message}`, 500));
  }
};

// Delete note
export const deleteNote = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get note ID from request params
    const { id } = req.params;
    // Validate
    if (!id) return next(new ErrorHandler("Note ID is required", 400));

    // Find note in database
    const note = await Note.findById(id);
    // Validate if note exists
    if (!note) return next(new ErrorHandler("Note not found", 404));
    // Delete note
    await Note.findByIdAndDelete(id);
    // Return response
    res.status(200).json({
      success: true,
      message: `Note deleted successfully`,
    });
  } catch (error: any) {
    next(new ErrorHandler(`Error deleting note: ${error.message}`, 500));
  }
};

// Update note
export const updateNote = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get note ID from request params
    const { id } = req.params;
    // Validate
    if (!id) return next(new ErrorHandler("Note ID is required", 400));

    // Fetch data from body
    const { title, description } = req.body;
    // Validate
    if (!title || !description)
      return next(new ErrorHandler("Title and description are required", 400));

    // Find note in database
    let note = await Note.findById(id);
    // Validate if note exists
    if (!note) return next(new ErrorHandler("Note not found", 404));

    // set isEdited
    note.isEdited = true;
    // Update note title and description
    note.title = title;
    note.description = description;
    // Save note
    note = await note.save();
    res.status(200).json({
      success: true,
      message: `Note updated successfully`,
      note,
    });
  } catch (error: any) {
    next(new ErrorHandler(`Error updating note: ${error.message}`, 500));
  }
};
