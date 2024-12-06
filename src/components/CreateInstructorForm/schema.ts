import { z } from "zod";

export const createInstructorSchema = z.object({
  name: z.string().min(2, "Instructor name is required."),
  about: z.string().min(2, "Instructor about information is required."),
});

export type CreateInstructorFormModel = z.infer<typeof createInstructorSchema>;
