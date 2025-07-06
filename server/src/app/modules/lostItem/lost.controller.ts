import { Request, Response } from "express";
import sendResponse from "../../global/response";
import { StatusCodes } from "http-status-codes";
import { lostTItemServices } from "./lostItem.service";

const toggleFoundStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const result = await lostTItemServices.toggleFoundStatus(id);
    const message = result.isFound
      ? "Item marked as found successfully"
      : "Item marked as not found successfully";

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message,
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
const createLostItem = async (req: Request, res: Response) => {
  try {
    const item = req.body;
    const result = await lostTItemServices.createLostItem(req.user.id, item);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Lost items created successfully",
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

const getLostItem = async (req: Request, res: Response) => {
  const result = await lostTItemServices.getLostItem();
  try {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Lost items retrieved successfully",
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

const getSingleLostItem = async (req: Request, res: Response) => {
  const id: any = req?.params.id;
  // console.log(id)
  const result = await lostTItemServices.getSingleLostItem(id);
  try {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Lost item retrieved successfully",
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

const getMyLostItem = async (req: Request, res: Response) => {

  const result = await lostTItemServices.getMyLostItem(req.user);
  try {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Lost item retrieved successfully",
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

const editMyLostItem = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = req.user;
    const result = await lostTItemServices.editMyLostItem(data, user);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Lost item edited successfully",
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

const deleteMyLostItem = async (req: Request, res: Response) => {
  const id=req.params.id
  await lostTItemServices.deleteMyLostItem(id);
  try {
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Lost item deleted successfully",
      data: null,
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
export const lostItemController = {
  toggleFoundStatus,
  createLostItem,
  getLostItem,
  getSingleLostItem,
  getMyLostItem,
  editMyLostItem,
  deleteMyLostItem
};
