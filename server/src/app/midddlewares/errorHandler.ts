import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import AppError from "../global/error";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof PrismaClientValidationError) {
    const argMatch = err.message.match(/Unknown argument `([^`]+)`/);
    // console.log(argMatch[1]);
    const errorMessage = argMatch
      ? `${argMatch[1]} is not a valid input`
      : "Something went wrong!";
    res.status(StatusCodes.NOT_ACCEPTABLE).json({
      success: false,
      message: errorMessage,
      errorDetails: err,
    });
  } else if (err instanceof PrismaClientKnownRequestError) {
    // console.log(err)

    const target = err?.meta?.target as string[] | undefined;
    const errorMessage = target
      ? target.map((error: any) => `${error} is invalid`).join(". ")
      : "";

    const issues: any = target
      ? target.map((field: any) => ({
          field,
          message: `${field} is not valid`,
        }))
      : [];

    res.status(StatusCodes.NOT_ACCEPTABLE).json({
      success: false,
      message: errorMessage,
      errorDetails: {
        issues,
      },
    });
  } else if (err instanceof ZodError) {
    const errorMessage = err.errors.map((error) => error.message).join(". ");

    const issues = err.errors.map((error) => ({
      field: error.path[1],
      message: error.message,
    }));

    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: errorMessage || "Validation error",
      errorDetails: {
        issues: issues,
      },
    });
  } else if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message || "Error",
      errorDetails: {
        issues: err,
      },
    });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || "Something went wrong!",
      errorDetails: err,
    });
  }
};

export default errorHandler;
