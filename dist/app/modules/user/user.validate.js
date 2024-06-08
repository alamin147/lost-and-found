"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
const userRegisterSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({
            required_error: "Username field is required",
        }),
        email: zod_1.z.string({
            required_error: "Email field is required",
        }),
        password: zod_1.z.string({
            required_error: "Password field is required",
        }),
    }),
});
const userLoginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().optional(),
        username: zod_1.z.string().optional(),
        password: zod_1.z.string({
            required_error: "Password field is required",
        }),
    }),
});
const changePasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z.string({
            required_error: "Current password is required",
        }),
        newPassword: zod_1.z.string({
            required_error: "New password field is required",
        }),
    }),
});
const changeEmailSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }),
    }),
});
const changeUsernameSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({ required_error: "Username is required" }),
    }),
});
exports.UserSchema = {
    userRegisterSchema,
    userLoginSchema,
    changePasswordSchema,
    changeEmailSchema,
    changeUsernameSchema,
};
