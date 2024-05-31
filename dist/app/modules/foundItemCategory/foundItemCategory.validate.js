"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoundItemCategorySchema = void 0;
const zod_1 = require("zod");
const createFoundItemCategory = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Category name field is required",
        }),
    }),
});
exports.FoundItemCategorySchema = {
    createFoundItemCategory,
};
