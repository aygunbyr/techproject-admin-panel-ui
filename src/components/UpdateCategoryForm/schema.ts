import { z } from "zod";

export const updateCategorySchema = z.object({
  name: z.string().min(2, "Category name is required."),
});

export type UpdateCategoryFormModel = z.infer<typeof updateCategorySchema>;
