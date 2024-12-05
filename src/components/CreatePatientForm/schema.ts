import { z } from "zod";

export const createPatientSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  phone: z.string().min(2, "Phone is required."),
  citizenId: z.string().min(2, "Citizen ID is required."),
});

export type CreatePatientFormModel = z.infer<typeof createPatientSchema>;
