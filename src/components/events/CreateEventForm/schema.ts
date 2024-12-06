import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(2, "Event title is required."),
  description: z.string().min(2, "Event description is required."),
  imageUrl: z.string().min(2, "Event Image URL is required."),
  startDate: z.date().refine(
    (date) => {
      const today = new Date();
      return date >= today;
    },
    {
      message: "Event start date must be today or later.",
    }
  ),
  endDate: z.date().refine(
    (date) => {
      const today = new Date();
      return date >= today;
    },
    {
      message: "Event end date must be today or later.",
    }
  ),
  applicationDeadline: z.date().refine(
    (date) => {
      const today = new Date();
      return date >= today;
    },
    {
      message: "Event application deadline date must be today or later.",
    }
  ),
  participationText: z.string().min(2, "Event participation text is required."),
  categoryId: z.number().min(1, "Event ID is required."),
});

export type CreateEventFormModel = z.infer<typeof createEventSchema>;
