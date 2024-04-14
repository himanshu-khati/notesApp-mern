import { Request, Response } from "express";
import { Note } from "../models/Note";
import { AuthenticatedRequest } from "../middlewares/auth";
import { title } from "process";

// add new note
export const newNote = async (req: AuthenticatedRequest, res: Response) => {
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
    const note = await Note.create({
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `something went wrong adding a new note: ${
        (error as Error).message
      }`,
    });
  }
};

// get all notes
export const getAllNotes = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        sucess: false,
        message: `user not found`,
      });
    }
    const userId = user._id;
    const notes = await Note.find({ user: userId });
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `something went wrong adding fetching note: ${
        (error as Error).message
      }`,
    });
  }
};

// delete note
export const deleteNote = async (req: AuthenticatedRequest, res: Response) => {
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
    const note = await Note.findById(id);
    // validate if note exists
    if (!note) {
      return res.status(401).json({
        success: false,
        message: `note not found`,
      });
    }
    // delete note
    await Note.findByIdAndDelete(id);
    // return response
    res.status(200).json({
      success: true,
      message: `note deleted successfully`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `something went wrong deleting note: ${
        (error as Error).message
      }`,
    });
  }
};

// update note
export const updateNote = async (req: AuthenticatedRequest, res: Response) => {
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
    let note = await Note.findById(id);
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `something went wrong updating note: ${
        (error as Error).message
      }`,
    });
  }
};
