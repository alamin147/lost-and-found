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
exports.claimsService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createClaim = (item, user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.claim.create({
        data: {
            foundItemId: item.foundItemId,
            distinguishingFeatures: item.distinguishingFeatures,
            lostDate: item.lostDate,
            userId: user.id,
        },
    });
    return result;
});
const getClaim = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.claim.findMany({
        include: {
            foundItem: {
                include: {
                    category: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            },
        },
    });
    return result;
});
const updateClaimStatus = (claimId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.claim.update({
        where: {
            id: claimId,
        },
        data,
    });
    return result;
});
exports.claimsService = {
    createClaim,
    getClaim,
    updateClaimStatus,
};
