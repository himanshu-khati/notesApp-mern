"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const Note_1 = require("../controller/Note");
const router = express_1.default.Router();
// note routes
router.post("/new", auth_1.isAuthenticated, Note_1.newNote);
router.get("/getAllNotes", auth_1.isAuthenticated, Note_1.getAllNotes);
router
    .route("/:id")
    .put(auth_1.isAuthenticated, Note_1.updateNote)
    .delete(auth_1.isAuthenticated, Note_1.deleteNote);
exports.default = router;
