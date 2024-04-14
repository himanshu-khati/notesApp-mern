import express from "express";
import { isAuthenticated } from "../middlewares/auth";
import {
  deleteNote,
  getAllNotes,
  newNote,
  updateNote,
} from "../controller/Note";
const router = express.Router();

// note routes
router.post("/new", isAuthenticated, newNote);
router.get("/getAllNotes", isAuthenticated, getAllNotes);
router
  .route("/:id")
  .put(isAuthenticated, updateNote)
  .delete(isAuthenticated, deleteNote);

export default router;
