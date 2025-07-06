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
const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const result = await userService.blockUser(id);

    if (result == "active") {
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User Activated successfully",
        data: result,
      });
    } else {
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User Blocked successfully",
        data: result,
      });
    }
  } catch (error: any) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: true,
      message: "User failed to blocked",
      data: null,
    });
  }
};
const changeUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { role } = req.body;
    const result = await userService.changeUserRole(id, role);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User role changed successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Failed to change user role",
      data: null,
    });
  }
};
const allUsers = async (req: Request, res: Response, next: NextFunction) => {
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
  allUsers,
  blockUser,
  changeUserRole,
};
