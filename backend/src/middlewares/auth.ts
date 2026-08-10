import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import jwt from "jsonwebtoken"
import { AuthUser } from "../types/express.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new AppError("Unauthorized", 401);
  }

  console.log(JWT_SECRET)
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    req.user = decoded;
    next();
  } catch (err) {
    throw new AppError("Unauthorized", 401);
  }
}
