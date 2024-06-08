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
    const { password, username: userName } = data;
    console.log(data);
    const user = yield prisma.user.findFirst({
        where: {
            OR: [
                {
                    username: userName,
                },
                {
                    email: userName,
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
    const { id, email, role, userImg, username } = user;
    const accessToken = utils_1.utils.createToken({ id, email, username, role, userImg });
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role,
        token: accessToken,
    };
});
const newPasswords = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data.newPassword);
    if (data.currentPassword === data.newPassword) {
        throw new error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Password is same");
    }
    const existedUser = yield prisma.user.findFirst({
        where: {
            username: user.username,
        },
    });
    // console.log(user)
    if (data.currentPassword &&
        existedUser &&
        !(yield utils_1.utils.comparePasswords(data.currentPassword, existedUser.password))) {
        throw new error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Password is incorrect");
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
    // console.log(email);
    const existedUser = yield prisma.user.findFirst({
        where: email,
    });
    // console.log(user);
    // console.log(existedUser);
    if (existedUser) {
        throw new error_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Email already exists. Try new one!");
    }
    yield prisma.user.update({
        where: {
            username: user === null || user === void 0 ? void 0 : user.username,
        },
        data: email,
    });
});
const changeUsername = (username, user) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield prisma.user.findFirst({
        where: username,
    });
    if (existedUser) {
        throw new error_1.default(http_status_codes_1.StatusCodes.CONFLICT, "Username already exists. Try new one!");
    }
    // console.log(user);
    yield prisma.user.update({
        where: {
            email: user.email,
        },
        data: username,
    });
});
exports.authServices = {
    loginUser,
    newPasswords,
    changeEmail,
    changeUsername,
};
