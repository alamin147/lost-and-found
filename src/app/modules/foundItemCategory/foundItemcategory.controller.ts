import { Request, Response } from "express";
import sendResponse from "../../global/response";
import { StatusCodes } from "http-status-codes";
import { foundItemcategoryService } from "./foundItemCategory.service";
import { FoundItemCategory } from "@prisma/client";

const createItemCategory = async (req: Request, res: Response) => {
  try {
    const item: FoundItemCategory = req.body;
    const result = await foundItemcategoryService.createItemCategory(item);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Found item category created successfully",
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
const getItemCategory = async (req: Request, res: Response) => {
  try {
    const result = await foundItemcategoryService.getItemCategory();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Found item category retrieved successfully",
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


export const foundItemcategoryController = {
  createItemCategory,
  getItemCategory,
};
