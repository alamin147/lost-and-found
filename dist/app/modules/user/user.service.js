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
exports.userService = void 0;
const client_1 = require("@prisma/client");
const utils_1 = require("../../utils/utils");
const error_1 = __importDefault(require("../../global/error"));
const prisma = new client_1.PrismaClient();
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const existedUser = yield prisma.user.findFirst({
        where: {
            OR: [{ username: user.username }, { email: user.email }],
        },
    });
    if (existedUser) {
        throw new error_1.default(400, "Same Username and email exists");
    }
    const hashedPassword = yield utils_1.utils.passwordHash(user.password);
    const result = yield prisma.$transaction((transactions) => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield transactions.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: hashedPassword,
            },
        });
        const returnData = {
            id: createdUser.id,
            username: createdUser.username,
            email: createdUser.email,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt,
        };
        return returnData;
    }));
    return result;
});
exports.userService = {
    registerUser,
};
