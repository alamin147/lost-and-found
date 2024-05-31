import { z } from "zod";
const userRegisterSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: "Username field is required",
    }),
    email: z.string({
      required_error: "Email field is required",
    }),
    password: z.string({
      required_error: "Password field is required",
    }),
  }),
});

const userLoginSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    username: z.string().optional(),
    password: z.string({
      required_error: "Password field is required",
    }),
  }),
});
const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string({required_error:"Current password is required"}),
    newPassword: z.string({
      required_error: "New password field is required",
    }),
  }),
});
const changeEmailUsernameSchema = z.object({
  body: z.object({
    email: z.string().optional(),
    username: z.string().optional(),
  }),
});
export const UserSchema = {
  userRegisterSchema,
  userLoginSchema,
  changePasswordSchema,
  changeEmailUsernameSchema
};
