import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/HttpError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 1. Prepare a copy of the error to work with
  let error = { ...err };
  error.message = err.message;

  // Log for you to see in the terminal while developing
  console.error(`--- ❌ ERROR LOG ---`);
  console.error(`Name: ${err.name}`);
  console.error(`Message: ${err.message}`);

  // 2. Handle Mongoose Validation Error (Rules from your Schema/Model)
  // This triggers for: missing required fields, bad email format, or invalid Priority Enum
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val: any) => val.message).join(", ");
    error = new HttpError(message, 400);
  }

  // 3. Handle Duplicate Key Error (MongoDB Code 11000)
  // This triggers if someone tries to use an email that is already unique in the DB
  if (err.code === 11000) {
    const message = "That entry already exists in our records.";
    error = new HttpError(message, 409);
  }

  // 4. Handle Mongoose CastError (Invalid ID format)
  // This triggers if a user sends a weird ID like /api/todos/123-abc
  if (err.name === "CastError") {
    const message = "Resource not found. The ID format provided is invalid.";
    error = new HttpError(message, 404);
  }

  // 5. Final Response Output
  // If it's one of our custom HttpErrors, it has a statusCode. Otherwise, default to 500.
  const statusCode = error.statusCode || 500;
  const finalMessage = error.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: finalMessage,
  });
};
