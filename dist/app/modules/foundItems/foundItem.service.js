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
const prisma = new client_1.PrismaClient();
const createFoundItem = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.foundItem.create({
        data: {
            categoryId: data.categoryId,
            description: data.description,
            date: data.date,
            claimProcess: data.claimProcess,
            img: data.img,
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
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            },
            category: true,
        },
    });
    return result;
});
const getSingleFoundItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.foundItem.findFirst({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    username: true,
                    role: true,
                },
            },
            category: true,
        },
    });
    return result;
});
// get my lost item
const getMyFoundItem = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.foundItem.findMany({
        where: {
            userId: user.id,
        },
        include: {
            user: true,
            category: true,
        },
    });
    return result;
});
const editMyFoundItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = {};
    if (data === null || data === void 0 ? void 0 : data.location) {
        updateData.location = data === null || data === void 0 ? void 0 : data.location;
    }
    if (data === null || data === void 0 ? void 0 : data.date) {
        updateData.date = data === null || data === void 0 ? void 0 : data.date;
    }
    if (data === null || data === void 0 ? void 0 : data.description) {
        updateData.description = data === null || data === void 0 ? void 0 : data.description;
    }
    const result = yield prisma.foundItem.update({
        where: {
            id: data.id,
        },
        data: updateData,
    });
    return result;
});
const deleteMyFoundItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.foundItem.delete({
        where: {
            id,
        },
    });
    return null;
});
exports.foundItemService = {
    createFoundItem,
    getFoundItem,
    getSingleFoundItem,
    getMyFoundItem,
    editMyFoundItem,
    deleteMyFoundItem,
};
