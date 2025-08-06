import { Priority } from "@prisma/client";
import z from "zod";

export const createSprintSchema = z.object({
  name: z.string().trim().min(1).max(60),
  notes: z.string().trim().max(250),
  start_date: z.date(),
});

export type CreateSprintValues = z.infer<typeof createSprintSchema>;

export const createStorySchema = z.object({
  name: z.string().trim().min(3).max(64),
  notes: z.string(),
  dueDate: z.date(),
  priority: z.enum(Priority),
  reminders: z.boolean(),
});

export type CreateStoryValues = z.infer<typeof createStorySchema>;
