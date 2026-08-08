import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { registerSchema, loginSchema } from "./schema.js";
import { pool } from "../../config/db.js";
import { AppError } from "../../errors/AppError.js";
import bcrypt from "bcrypt";
import { User } from "./type.js";
import { COOKIE_OPTIONS, signToken } from "../../utils/token.js";

const SALT_ROUNDS = 10;

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const {email, password} = registerSchema.parse(req.body);

  const existingUser = await pool.query(`
    SELECT id
    FROM users
    WHERE email=$1
    `, [email]);

  if (existingUser.rows.length > 0) {
    throw new AppError("Email already exist", 409);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const userResult = await pool.query<User>(`
    INSERT INTO
    users (email, password)
    VALUES ($1, $2)
    RETURNING id, email
    `, [email, passwordHash]);

  const user = userResult.rows[0];
  const token = signToken({id: user.id, email: user.email});
  
  res.cookie("token", token, COOKIE_OPTIONS);

  res.status(201).json({
    message: "Registered successfully"
  })
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const {email, password} = loginSchema.parse(req.body);

  const userResult = await pool.query<User>(`
    SELECT id, email, password, created_at
    FROM users WHERE email=$1
    `, [email]);
    
  if (userResult.rows.length === 0) {
    throw new AppError("Invalid email or password", 401);
  }

  const user = userResult.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  console.log(password);
  console.log(user);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = signToken({id: user.id, email: user.email});

  res.cookie("token", token, COOKIE_OPTIONS);
  res.status(200).json({
    message: "Login successfully"
  })
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.status(200).json({
    message: "Logged out successfully"
  })
});

