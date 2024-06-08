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
exports.foundItemController = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_1 = __importDefault(require("../../global/response"));
const foundItem_service_1 = require("./foundItem.service");
const utils_1 = require("../../utils/utils");
const createFoundItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   console.log({a:req.body,b:req.user})
        const result = yield foundItem_service_1.foundItemService.createFoundItem(req.body, req.user.id);
        (0, response_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            success: true,
            message: "Found item reported successfully",
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
const getFoundItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meta = yield utils_1.utils.calculateMeta(req.query);
        const result = yield foundItem_service_1.foundItemService.getFoundItem(req.query);
        (0, response_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "Found items retrieved successfully",
            meta,
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
const getSingleFoundItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req === null || req === void 0 ? void 0 : req.params.id;
        const result = yield foundItem_service_1.foundItemService.getSingleFoundItem(id);
        (0, response_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "Found item retrieved successfully",
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
const getMyFoundItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield foundItem_service_1.foundItemService.getMyFoundItem(req.user);
    try {
        (0, response_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "Found item retrieved successfully",
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
const editMyFoundItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    yield foundItem_service_1.foundItemService.editMyFoundItem(data);
    try {
        (0, response_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "Found item edited successfully",
            data: null,
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
const deleteMyFoundItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield foundItem_service_1.foundItemService.deleteMyFoundItem(id);
    try {
        (0, response_1.default)(res, {
            statusCode: http_status_codes_1.StatusCodes.OK,
            success: true,
            message: "Found item deleted successfully",
            data: null,
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
exports.foundItemController = {
    createFoundItem,
    getFoundItem,
    getSingleFoundItem,
    getMyFoundItem,
    editMyFoundItem,
    deleteMyFoundItem
};
