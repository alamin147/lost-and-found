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
Object.defineProperty(exports, "__esModule", { value: true });
exports.foundItemService = void 0;
const client_1 = require("@prisma/client");
const selects_1 = require("../../utils/selects");
const prisma = new client_1.PrismaClient();
const createFoundItem = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.foundItem.create({
        data: {
            categoryId: data.categoryId,
            description: data.description,
            foundItemName: data.foundItemName,
            location: data.location,
            userId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
            category: true,
        },
    });
    return result;
});
const getFoundItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, page = 1, limit = 10, sortBy = "foundItemName", sortOrder = "asc", foundItemName, } = data;
    const whereConditions = {};
    if (foundItemName) {
        whereConditions.foundItemName = {
            contains: foundItemName,
            mode: "insensitive",
        };
    }
    if (searchTerm) {
        whereConditions.OR = [
            { foundItemName: { contains: searchTerm, mode: "insensitive" } },
            { location: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
        ];
    }
    const result = yield prisma.foundItem.findMany({
        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder,
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        select: selects_1.selects.foundItemSelect,
    });
    return result;
});
exports.foundItemService = {
    createFoundItem,
    getFoundItem,
};
