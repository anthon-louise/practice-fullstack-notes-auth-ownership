import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/AppError.js"
import { ZodError } from "zod"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: err.issues[0].message
    })
  }

  console.error(err);

  res.status(500).json({
    message: "Internal Server Error"
  })
}
