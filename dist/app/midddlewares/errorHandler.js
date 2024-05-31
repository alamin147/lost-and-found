"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("@prisma/client/runtime/library");
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const error_1 = __importDefault(require("../global/error"));
const errorHandler = (err, req, res, next) => {
    var _a;
    if (err instanceof library_1.PrismaClientValidationError) {
        const argMatch = err.message.match(/Unknown argument `([^`]+)`/);
        // console.log(argMatch[1]);
        const errorMessage = argMatch
            ? `${argMatch[1]} is not a valid input`
            : "Something went wrong!";
        res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).json({
            success: false,
            message: errorMessage,
            errorDetails: err,
        });
    }
    else if (err instanceof library_1.PrismaClientKnownRequestError) {
        // console.log(err)
        const target = (_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target;
        const errorMessage = target
            ? target.map((error) => `${error} is invalid`).join(". ")
            : "";
        const issues = target
            ? target.map((field) => ({
                field,
                message: `${field} is not valid`,
            }))
            : [];
        res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).json({
            success: false,
            message: errorMessage,
            errorDetails: {
                issues,
            },
        });
    }
    else if (err instanceof zod_1.ZodError) {
        const errorMessage = err.errors.map((error) => error.message).join(". ");
        const issues = err.errors.map((error) => ({
            field: error.path[1],
            message: error.message,
        }));
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            success: false,
            message: errorMessage || "Validation error",
            errorDetails: {
                issues: issues,
            },
        });
    }
    else if (err instanceof error_1.default) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message || "Error",
            errorDetails: {
                issues: err,
            },
        });
    }
    else {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message || "Something went wrong!",
            errorDetails: err,
        });
    }
};
exports.default = errorHandler;
