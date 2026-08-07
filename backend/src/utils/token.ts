const jwtSecret = process.env.JWT_SECRET as string;
import jwt from "jsonwebtoken";
import { CookieOptions } from "express";

export const signToken = (payload: {id: number; email: string}) => {
  return jwt.sign(payload, jwtSecret, {expiresIn: "1d"});
}

export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 24 * 60 *60 *1000
}
