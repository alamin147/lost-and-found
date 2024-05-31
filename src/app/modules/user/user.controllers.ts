import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../global/response";
import { StatusCodes } from "http-status-codes";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    const result = await userService.registerUser(user);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};
const allUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.allUsers();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const userController = {
  registerUser,
  allUsers
};
