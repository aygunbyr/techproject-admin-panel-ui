import { z } from "zod";

export const updateInstructorSchema = z.object({
  name: z.string().min(2, "Instructor name is required."),
  about: z.string().min(2, "Instructor about information is required."),
});

export type UpdateInstructorFormModel = z.infer<typeof updateInstructorSchema>;
