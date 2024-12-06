import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(2, "Category name is required."),
});

export type CreateCategoryFormModel = z.infer<typeof createCategorySchema>;
