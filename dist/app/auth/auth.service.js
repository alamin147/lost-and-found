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
exports.authServices = void 0;
const client_1 = require("@prisma/client");
const utils_1 = require("../utils/utils");
const error_1 = __importDefault(require("../global/error"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = data;
    const user = yield prisma.user.findFirst({
        where: {
            OR: [
                {
                    username,
                },
                {
                    email,
                },
            ],
        },
    });
    if (!user) {
        throw new error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "User does not exist");
    }
    if (password && !(yield utils_1.utils.comparePasswords(password, user.password))) {
        throw new error_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Password is incorrect");
    }
    const { id } = user;
    const accessToken = utils_1.utils.createToken({ id, email });
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        token: accessToken,
    };
});
const newPasswords = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield prisma.user.findFirst({
        where: {
            username: user.username,
        },
    });
    if (data.currentPassword &&
        existedUser &&
        !(yield utils_1.utils.comparePasswords(data.currentPassword, existedUser.password))) {
        throw new error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Password is incorrect");
    }
    if (data.currentPassword === data.newPassword) {
        throw new error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Password is same");
    }
    const newHashPassword = yield utils_1.utils.passwordHash(data.newPassword);
    yield prisma.user.update({
        where: {
            email: existedUser === null || existedUser === void 0 ? void 0 : existedUser.email,
        },
        data: {
            password: newHashPassword,
        },
    });
});
const changeEmail = (email, user) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield prisma.user.findFirst({
        where: {
            email,
        },
    });
    if (existedUser) {
        throw new error_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Email already exists. Try new one");
    }
    yield prisma.user.update({
        where: {
            username: user.username,
        },
        data: {
            email,
        },
    });
});
const changeUsername = (username, user) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield prisma.user.findFirst({
        where: {
            username,
        },
    });
    if (existedUser) {
        throw new error_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Username already exists. Try new one");
    }
    yield prisma.user.update({
        where: {
            email: user.email,
        },
        data: {
            username,
        },
    });
});
exports.authServices = {
    loginUser,
    newPasswords,
    changeEmail,
    changeUsername,
};
