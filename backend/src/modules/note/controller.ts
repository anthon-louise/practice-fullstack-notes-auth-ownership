import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { createNoteSchema, updateNoteSchema } from "./schema.js";
import { AppError } from "../../errors/AppError.js";
import { pool } from "../../config/db.js";

export const createNote = asyncHandler(async (req: Request, res: Response) => {
  const {title, content} = createNoteSchema.parse(req.body);
  
  if (!req.user) {
    throw new AppError("User not authenticated", 401);
  }

  const userId = req.user.id;

  await pool.query(`
    INSERT INTO
    notes (title, content, user_id)
    VALUES ($1, $2, $3)
    `, [title, content, userId]);


  res.status(201).json({
    message: "Note created"
  });
});

export const getNotes = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("User not authenticated", 401);
  }

  const userId = req.user.id;

  const notes = await pool.query(`
    SELECT id, title, content, created_at
    FROM notes WHERE user_id=$1
    `, [userId]);

  res.status(400).json({
    message: "Notes fetched",
    notes: notes.rows
  })
});

export const getNoteById = asyncHandler(async (req: Request, res: Response) => {
  const noteId = req.params.id;

  if (!req.user) {
    throw new AppError("User not authenticated", 401);
  }

  const userId = req.user.id;

  const note = await pool.query(`
    SELECT id, title, content, created_at
    FROM notes
    WHERE id=$1 AND user_id=$2
    `, [noteId, userId]);

  if (note.rows.length === 0) {
    throw new AppError("Note not found", 404);
  }

  res.status(200).json({
    message: "Note fetched",
    note: note.rows[0]
  })
});

export const updateNote = asyncHandler(async (req: Request, res: Response) => {
  const noteId = req.params.id;

  if (!req.user) {
    throw new AppError("User not authenticated", 401);
  }

  const userId = req.user.id;

  const {title, content} = updateNoteSchema.parse(req.body);

  const note = await pool.query(`
    UPDATE notes
    SET title=COALESCE($1, title), content=COALESCE($2, content)
    WHERE id=$3 AND user_id=$4
    `, [title ?? null, content ?? null, noteId, userId]);

  if (note.rowCount === 0) {
    throw new AppError("Note not found", 404);
  }

  res.status(200).json({
    message: "Note updated"
  })
});

export const deleteNote = asyncHandler(async (req: Request, res: Response) => {
  const noteId = req.params.id;

  if (!req.user) {
    throw new AppError("User not authenticated", 404);
  }

  const userId = req.user.id;

  const note = await pool.query(`
    DELETE FROM notes
    WHERE id=$1 AND user_id=$2
    `, [noteId, userId]);

  if (note.rowCount === 0) {
    throw new AppError("Note not found", 404);
  }

  res.status(200).json({
    message: "Note deleted"
  })
});
