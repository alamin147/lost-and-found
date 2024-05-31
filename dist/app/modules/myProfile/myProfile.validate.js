"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyProfileSchema = void 0;
const zod_1 = require("zod");
const updateMyProfile = zod_1.z.object({
    body: zod_1.z.object({
        bio: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
    }),
});
exports.MyProfileSchema = {
    updateMyProfile,
};
