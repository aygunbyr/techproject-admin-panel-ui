import { z } from "zod";

export const createAppointmentSchema = z.object({
  date: z.date().refine(
    (date) => {
      const today = new Date();
      const threeDaysLater = new Date(today);
      threeDaysLater.setDate(today.getDate() + 3);
      return date >= threeDaysLater;
    },
    {
      message: "The appointment date must be at least 3 days later than today.",
    }
  ),
  patientId: z.string().min(1, "Patient ID is required."),
  doctorId: z.number().min(1, "Doctor ID is required."),
});

export type CreateAppointmentFormModel = z.infer<
  typeof createAppointmentSchema
>;
