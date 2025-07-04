import { Request, Response } from "express";
import sendResponse from "../../global/response";
import { StatusCodes } from "http-status-codes";
import { itemcategoryService } from "./itemCategory.service";
import { ItemCategory } from "@prisma/client";

const createItemCategory = async (req: Request, res: Response) => {
  try {
    const item: ItemCategory = req.body;
    const result = await itemcategoryService.createItemCategory(item);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Item category created successfully",
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
    const result = await itemcategoryService.getItemCategory();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Item category retrieved successfully",
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


export const itemcategoryController = {
  createItemCategory,
  getItemCategory,
};
