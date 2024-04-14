"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNote = exports.deleteNote = exports.getAllNotes = exports.newNote = void 0;
const Note_1 = require("../models/Note");
const error_1 = __importDefault(require("../middlewares/error"));
// Add new note
const newNote = async (req, res, next) => {
    try {
        // Fetch data from body
        const { title, description } = req.body;
        // Validate
        if (!title || !description)
            return next(new error_1.default("All fields are required", 400));
        // Get user
        const user = req.user;
        // Create note
        const note = await Note_1.Note.create({
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
    }
    catch (error) {
        next(new error_1.default(`Error adding a new note: ${error.message}`, 500));
    }
};
exports.newNote = newNote;
// Get all notes
const getAllNotes = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user)
            return next(new error_1.default("User not found", 401));
        const userId = user._id;
        const notes = await Note_1.Note.find({ user: userId });
        if (notes.length === 0)
            return next(new error_1.default("No notes found for the user", 404));
        res.status(200).json({
            success: true,
            message: `All notes fetched successfully`,
            notes,
        });
    }
    catch (error) {
        next(new error_1.default(`Error fetching notes: ${error.message}`, 500));
    }
};
exports.getAllNotes = getAllNotes;
// Delete note
const deleteNote = async (req, res, next) => {
    try {
        // Get note ID from request params
        const { id } = req.params;
        // Validate
        if (!id)
            return next(new error_1.default("Note ID is required", 400));
        // Find note in database
        const note = await Note_1.Note.findById(id);
        // Validate if note exists
        if (!note)
            return next(new error_1.default("Note not found", 404));
        // Delete note
        await Note_1.Note.findByIdAndDelete(id);
        // Return response
        res.status(200).json({
            success: true,
            message: `Note deleted successfully`,
        });
    }
    catch (error) {
        next(new error_1.default(`Error deleting note: ${error.message}`, 500));
    }
};
exports.deleteNote = deleteNote;
// Update note
const updateNote = async (req, res, next) => {
    try {
        // Get note ID from request params
        const { id } = req.params;
        // Validate
        if (!id)
            return next(new error_1.default("Note ID is required", 400));
        // Fetch data from body
        const { title, description } = req.body;
        // Validate
        if (!title || !description)
            return next(new error_1.default("Title and description are required", 400));
        // Find note in database
        let note = await Note_1.Note.findById(id);
        // Validate if note exists
        if (!note)
            return next(new error_1.default("Note not found", 404));
        // Toggle isCompleted
        note.isCompleted = !note.isCompleted;
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
    }
    catch (error) {
        next(new error_1.default(`Error updating note: ${error.message}`, 500));
    }
};
exports.updateNote = updateNote;
