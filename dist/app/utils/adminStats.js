"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminStats = void 0;
const foundItem_service_1 = require("../modules/foundItems/foundItem.service");
const response_1 = __importDefault(require("../global/response"));
const http_status_codes_1 = require("http-status-codes");
const lostItem_service_1 = require("../modules/lostItem/lostItem.service");
const user_service_1 = require("../modules/user/user.service");
const adminStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = {};
    try {
        const foundItems = yield foundItem_service_1.foundItemService.getFoundItem({});
        const lostItems = yield lostItem_service_1.lostTItemServices.getLostItem();
        const totalUsers = yield user_service_1.userService.allUsers();
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
        (0, response_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "Admin stats retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        (0, response_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            success: false,
            message: error === null || error === void 0 ? void 0 : error.message,
            data: null,
        });
    }
});
exports.adminStats = adminStats;
