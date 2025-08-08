import { Priority, Status } from "@prisma/client";
import z from "zod";

export const createStorySchema = z.object({
  name: z.string().trim().min(3).max(64),
  notes: z.string(),
  dueDate: z.date(),
  priority: z.enum(Priority),
});

export const updateStorySchema = createStorySchema.extend({
  id: z.string(),
  status: z.enum(Status),
});

export type CreateStoryValues = z.infer<typeof createStorySchema>;
export type UpdateStoryValues = z.infer<typeof updateStorySchema>;
