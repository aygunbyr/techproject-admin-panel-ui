import { z } from "zod";

export const branches = [
  "General Practice",
  "Pediatrics",
  "Surgery",
  "Cardiology",
  "Dermatology",
] as const;

export const createDoctorSchema = z.object({
  name: z.string().min(1, "Name is required."),
  branch: z.enum(branches, {
    errorMap: () => ({
      message: `Branch must be one of ${branches.join(", ")}.`,
    }),
  }),
});

export type CreateDoctorFormModel = z.infer<typeof createDoctorSchema>;
