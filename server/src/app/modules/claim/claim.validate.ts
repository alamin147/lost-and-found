import { status } from "../../global/globalValues";
import { INVALID, z } from "zod";
const createClaim = z.object({
  body: z.object({
    foundItemId: z.string({
      required_error: "Claim item id field is required",
    }),
    distinguishingFeatures: z.string({
      required_error: "Distinguishing features of claim item field is required",
    }),
    lostDate: z.string({
      required_error: "Lost date of claim item field is required",
    }),
  }),
});
const updateClaim = z.object({
  body: z.object({
    foundItemId: z.string().optional(),
    distinguishingFeatures: z.string().optional(),
    lostDate: z.string().optional(),
    status: z
      .enum([status.approved, status.pending, status.rejected])
      .optional(),
  },{message:"Invalid input"}),
});

export const ItemClaimSchema = {
  createClaim,
  updateClaim,
};
