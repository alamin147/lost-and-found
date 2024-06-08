import { Request, Response } from "express";
import sendResponse from "../global/response";
import { StatusCodes } from "http-status-codes";
import { authServices } from "./auth.service";
import { TLogin, newPassword } from "../global/interface";

const login = async (req: Request, res: Response) => {
  try {
    
    const user: TLogin = req.body;
    const result = await authServices.loginUser(user);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User logged in successfully',
        data: result,
      });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: error?.message,
      data: null,
    });
  }
};
const newPasswords = async (req: Request, res: Response) => {
  try {
    const passwordData = req.body;
    const result = await authServices.newPasswords(passwordData, req.user);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Password changed successfully',
        data: result,
      });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: error?.message,
      data: null,
    });
  }
};

const changeEmail = async (req: Request, res: Response) => {
  try {
    const email:string = req.body;
    // console.log(email)
    const result = await authServices.changeEmail(email, req.user);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Email changed successfully',
        data: result,
      });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: error?.message,
      data: null,
    });
  }
};

const changeUsername = async (req: Request, res: Response) => {
  try {
    const username = req.body;
    const result = await authServices.changeUsername(username, req.user);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Username changed successfully',
        data: result,
      });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: error?.message,
      data: null,
    });
  }
};


export const authController={
    login,
    newPasswords,
    changeEmail,
    changeUsername
}