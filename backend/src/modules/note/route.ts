import express from "express";
import { authenticate } from "../../middlewares/auth.js";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "./controller.js";

const router = express.Router();

router.use(authenticate);

router.post("/", createNote);
router.get("/:id", getNoteById);
router.get("/", getNotes);
router.delete("/:id", deleteNote);
router.put("/:id", updateNote);

export default router;
