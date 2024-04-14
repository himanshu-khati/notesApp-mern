"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNote = exports.deleteNote = exports.getAllNotes = exports.newNote = void 0;
const Note_1 = require("../models/Note");
// add new note
const newNote = async (req, res) => {
    try {
        // fetch data from body
        const { title, description } = req.body;
        // validate
        if (!title || !description) {
            res.status(400).json({
                success: false,
                message: `all fields are required`,
            });
        }
        // get user
        const user = req.user;
        // create note
        const note = await Note_1.Note.create({
            title,
            description,
            user: user,
        });
        // return response
        res.status(200).json({
            success: true,
            message: `note added successfully`,
            note,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `something went wrong adding a new note: ${error.message}`,
        });
    }
};
exports.newNote = newNote;
// get all notes
const getAllNotes = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                sucess: false,
                message: `user not found`,
            });
        }
        const userId = user._id;
        const notes = await Note_1.Note.find({ user: userId });
        if (notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No notes found for the user`,
            });
        }
        res.status(200).json({
            success: true,
            message: `all notes fetched successfully`,
            notes,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `something went wrong adding fetching note: ${error.message}`,
        });
    }
};
exports.getAllNotes = getAllNotes;
// delete note
const deleteNote = async (req, res) => {
    try {
        // get note id from request params
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: `Note ID is required`,
            });
        }
        // find note in database
        const note = await Note_1.Note.findById(id);
        // validate if note exists
        if (!note) {
            return res.status(401).json({
                success: false,
                message: `note not found`,
            });
        }
        // delete note
        await Note_1.Note.findByIdAndDelete(id);
        // return response
        res.status(200).json({
            success: true,
            message: `note deleted successfully`,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `something went wrong deleting note: ${error.message}`,
        });
    }
};
exports.deleteNote = deleteNote;
// update note
const updateNote = async (req, res) => {
    try {
        // get note id from request params
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: `Note ID is required`,
            });
        }
        const { title, description } = req.body;
        // find note in database
        let note = await Note_1.Note.findById(id);
        // validate if note exists
        if (!note) {
            return res.status(404).json({
                success: false,
                message: `note not found`,
            });
        }
        // toggle iscompleted
        note.isCompleted = !note.isCompleted;
        // update note title and body
        note.title = title;
        note.description = description;
        // save note
        note = await note.save();
        res.status(200).json({
            success: true,
            message: `note updated successfully`,
            note,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: `something went wrong updating note: ${error.message}`,
        });
    }
};
exports.updateNote = updateNote;
