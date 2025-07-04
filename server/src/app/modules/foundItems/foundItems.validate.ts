import { z } from "zod";
const createFoundItem = z.object({
  body: z.object({
    foundItemName: z.string({
      required_error: "Item name field is required",
    }),
    location: z.string({
      required_error: "Location of item field is required",
    }),
    description: z.string({
      required_error: "Description of item field is required",
    }),
    img: z.string({
      required_error: "Image of item field is required",
    }),
    claimProcess: z.string({
      required_error: "Claim Process of item field is required",
    }),
    date: z.string({
      required_error: "Date of item field is required",
    }),
  }),
});

export const FoundItemSchema = {
  createFoundItem,
};
