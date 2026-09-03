import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { createNoteSchema } from "./schema.js";
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
    FROM notes WHERE id=$1
    `, [userId]);

  res.status(400).json({
    message: "Notes fetched",
    notes: notes.rows
  })
});

