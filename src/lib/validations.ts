import { Priority } from "@prisma/client";
import z from "zod";

export const createStorySchema = z.object({
  name: z.string().trim().min(3).max(64),
  notes: z.string(),
  dueDate: z.date(),
  priority: z.enum(Priority),
  reminders: z.boolean(),
  sendDailyProgressReports: z.boolean(),
  dailyProgressReportTime: z.string(),
});

export type CreateStoryValues = z.infer<typeof createStorySchema>;
