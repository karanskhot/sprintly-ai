"use server";

import { db } from "@/lib/db";
import { validateUserSession } from "@/lib/validateUser";
import {
  createStorySchema,
  CreateStoryValues,
  updateStorySchema,
  UpdateStoryValues,
} from "@/lib/validations";
import { Status } from "@prisma/client";
import { endOfDay, isSameDay, startOfDay } from "date-fns";
import { revalidatePath } from "next/cache";

export const create_new_story = async (data: CreateStoryValues) => {
  const userId = await validateUserSession();
  const start_today = startOfDay(new Date());
  const end_today = endOfDay(new Date());
  console.log(start_today);
  console.log(end_today);

  try {
    const isValid = createStorySchema.safeParse(data);
    if (!isValid.success) throw new Error(`Invalidated from server : ${isValid.error.message}`);

    const status: Status = isSameDay(data.dueDate, new Date()) ? "Active" : "Scheduled";
    const new_story = await db.story.create({
      data: {
        name: data.name,
        dueDate: data.dueDate,
        userId,
        notes: data.notes,
        priority: data.priority,
        status,
      },
    });
    revalidatePath("/today");
    return new_story;
  } catch (error) {
    console.log(error);
  }
};

export const update_user_story = async (data: UpdateStoryValues) => {
  const userId = await validateUserSession();
  try {
    const isValid = updateStorySchema.safeParse(data);
    if (!isValid.success) throw new Error(`Invalidated from server : ${isValid.error.message}`);
    const is_story_valid = await db.story.findFirst({
      where: {
        userId,
        id: data.id,
        status: { in: ["Active", "Scheduled", "Archived"] },
      },
    });
    if (!is_story_valid) throw new Error(`Unauthorized to modify this story.`);
    const start_today = startOfDay(new Date());
    const end_today = endOfDay(new Date());

    const status: Status = isSameDay(data.dueDate, new Date()) ? "Active" : "Scheduled";
    const updated_story = await db.story.update({
      where: { id: data.id },
      data: {
        name: data.name,
        dueDate: data.dueDate,
        notes: data.notes,
        priority: data.priority,
        status: data.status,
      },
    });
    revalidatePath("/today");
    revalidatePath("/next-seven-days");
    return updated_story;
  } catch (error) {
    console.log(error);
    throw new Error(`Something went wrong`);
  }
};
