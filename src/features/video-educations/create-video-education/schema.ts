import { z } from "zod";

export const createVideoEducationSchema = z.object({
  title: z.string().min(2, "Video education title is required."),
  description: z.string().min(2, "Video education description is required."),
  totalHour: z.number().min(0, "Video education total hour is required."),
  isCertified: z.boolean(),
  level: z.number(),
  imageUrl: z.string().min(2, "Video education Image URL is required."),
  instructorId: z.string().min(2, "Instructor ID is required."),
  programmingLanguage: z.string().min(1, "Video education programming language is required."),
});

export type CreateVideoEducationFormModel = z.infer<typeof createVideoEducationSchema>;
