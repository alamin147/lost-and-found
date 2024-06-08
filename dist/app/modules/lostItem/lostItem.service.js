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
exports.lostTItemServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const markAsFound = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.lostItem.update({
        where: {
            id,
        },
        data: {
            isFound: true,
        },
    });
    return result;
});
const createLostItem = (userId, item) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.lostItem.create({
        data: {
            lostItemName: item.lostItemName,
            description: item.description,
            categoryId: item.categoryId,
            img: item.img,
            location: item.location,
            date: item.date,
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
const getLostItem = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.lostItem.findMany({
        include: {
            user: true,
            category: true,
        },
    });
    return result;
});
// get single lost item
const getSingleLostItem = (singleId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.lostItem.findFirst({
        where: {
            id: singleId,
        },
        include: {
            user: true,
            category: true,
        },
    });
    return result;
});
// get my lost item
const getMyLostItem = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.lostItem.findMany({
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
const editMyLostItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield prisma.lostItem.update({
        where: {
            id: data.id,
        },
        data: updateData,
    });
    return result;
});
const deleteMyLostItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.lostItem.delete({
        where: {
            id,
        },
    });
    return null;
});
exports.lostTItemServices = {
    markAsFound,
    createLostItem,
    getLostItem,
    getSingleLostItem,
    getMyLostItem,
    editMyLostItem,
    deleteMyLostItem,
};
