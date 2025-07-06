import { Request, Response } from "express";
import { foundItemService } from "../modules/foundItems/foundItem.service";
import sendResponse from "../global/response";
import { StatusCodes } from "http-status-codes";
import { lostTItemServices } from "../modules/lostItem/lostItem.service";
import { userService } from "../modules/user/user.service";
import { claimsService } from "../modules/claim/claim.service";

export const adminStats = async (req: Request, res: Response) => {
  const result: any = {};
  try {
    const foundItems = await foundItemService.getFoundItem({});
    const lostItems = await lostTItemServices.getLostItem();
    const totalUsers = await userService.allUsers();
    const claims = await claimsService.getClaim();
    let pendingClaims = 0;
    if (claims) {
      pendingClaims = claims.filter((claim) => claim.status === "PENDING").length;
      result.pendingClaims = pendingClaims|0;
       result.totalClaims = claims.length | 0;
    }
    const total = (foundItems.length + lostItems.length) | 0;
    result.total = total;
    // console.log(foundItems);
    if (foundItems) {
      result.foundItems = foundItems.length;
      result.total = total;
    }
    if (lostItems) {
      result.lostItems = lostItems.length;
      result.total = total;
    }

    if (totalUsers) {
      // console.log(first)
      result.totalUsers = totalUsers.length;
      result.userData = totalUsers;
    }
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin stats retrieved successfully",
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
