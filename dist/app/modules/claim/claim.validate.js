"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemClaimSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createClaim = zod_1.z.object({
    body: zod_1.z.object({
        foundItemId: zod_1.z.string({
            required_error: "Claim item id field is required",
        }),
        distinguishingFeatures: zod_1.z.string({
            required_error: "Distinguishing features of claim item field is required",
        }),
        lostDate: zod_1.z.string({
            required_error: "Lost date of claim item field is required",
        }),
    }),
});
const updateClaim = zod_1.z.object({
    body: zod_1.z.object({
        foundItemId: zod_1.z.string().optional(),
        distinguishingFeatures: zod_1.z.string().optional(),
        lostDate: zod_1.z.string().optional(),
        status: zod_1.z
            .enum([client_1.status.APPROVED, client_1.status.PENDING, client_1.status.REJECTED])
            .optional(),
    }, { message: "Invalid input" }),
});
exports.ItemClaimSchema = {
    createClaim,
    updateClaim,
};
