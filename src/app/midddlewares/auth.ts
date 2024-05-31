import { NextFunction, Request, Response } from "express";
import { utils } from "../utils/utils";
import AppError from "../global/error";
import { StatusCodes } from "http-status-codes";

const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
      }
      const verifiedUser = utils.verifyToken(token);
      req.user = verifiedUser;

      if (!verifiedUser) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
      }

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new AppError(StatusCodes.FORBIDDEN, "Forbidden");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
