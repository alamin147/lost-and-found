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
  }),
});

export const FoundItemSchema = {
  createFoundItem,
};
