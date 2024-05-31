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
exports.utils = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config/config"));
const client_1 = require("@prisma/client");
const passwordHash = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = Number(config_1.default.saltrounds);
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
    return hashedPassword;
});
const comparePasswords = (plainTextPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    return match;
});
const createToken = (data) => {
    return jsonwebtoken_1.default.sign(data, config_1.default.jwt_secrets, {
        algorithm: "HS256",
        expiresIn: config_1.default.jwt_expires_in,
    });
};
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, config_1.default.jwt_secrets);
};
const calculateMeta = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = data;
    const prisma = new client_1.PrismaClient();
    const res = (yield prisma.foundItem.findMany({})).length;
    const meta = {
        total: res,
        page: Number(page),
        limit: Number(limit),
    };
    return meta;
});
exports.utils = {
    passwordHash,
    comparePasswords,
    createToken,
    verifyToken,
    calculateMeta,
};
