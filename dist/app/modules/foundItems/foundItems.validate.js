"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoundItemSchema = void 0;
const zod_1 = require("zod");
const createFoundItem = zod_1.z.object({
    body: zod_1.z.object({
        foundItemName: zod_1.z.string({
            required_error: "Item name field is required",
        }),
        location: zod_1.z.string({
            required_error: "Location of item field is required",
        }),
        description: zod_1.z.string({
            required_error: "Description of item field is required",
        }),
        img: zod_1.z.string({
            required_error: "Image of item field is required",
        }),
        claimProcess: zod_1.z.string({
            required_error: "Claim Process of item field is required",
        }),
        date: zod_1.z.string({
            required_error: "Date of item field is required",
        }),
    }),
});
exports.FoundItemSchema = {
    createFoundItem,
};
