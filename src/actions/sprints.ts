"use server";
import { db } from "@/lib/db";
import { validateUserSession } from "@/lib/validateUser";
import { createSprintSchema, CreateSprintValues } from "@/lib/validations";
import { Sprint, Status } from "@prisma/client";
import { addDays, startOfDay } from "date-fns";

export const create_new_sprint = async (
  data: CreateSprintValues
): Promise<{ success: boolean; data: Sprint | null; message: string }> => {
  const userId = await validateUserSession();
  try {
    const isValid = createSprintSchema.safeParse(data);
    if (!isValid) {
      console.log(`Invalid on server: ${isValid}`);
      return { success: true, data: null, message: "" };
    }
    const today = startOfDay(new Date());
    const startDate = startOfDay(data.start_date);
    const endDate = addDays(startDate, 6);

    //get latest sprint and check its start date and end date
    // TO:DO - Check overlapping Sprints.

    const status: Status =
      startDate === today ? "Active" : startDate > today ? "Scheduled" : "Active";

    const new_sprint = await db.sprint.create({
      data: {
        name: data.name,
        start_date: data.start_date,
        end_date: endDate,
        userId,
        status,
        notes: data.notes,
      },
    });
    return { success: true, data: new_sprint, message: "sprint created successfully." };
  } catch (error) {
    return { success: true, data: null, message: `Error Creating Sprint : ${error}` };
  }
};

// Inngest functions.
export const bulk_update_sprints = async () => {
  const today = new Date();

  //mark sprint to completed
  const completedSprints = await db.sprint.updateMany({
    where: {
      end_date: { lt: today },
      status: { in: ["Active", "Scheduled"] },
    },
    data: { status: "Completed" },
  });

  //mark scheduled to active
  console.log(today);
  const activeSprint = await db.sprint.updateMany({
    where: {
      start_date: { lte: today },
      end_date: { gte: today },
      status: "Scheduled",
    },
    data: { status: "Active" },
  });
  return {
    completed: completedSprints.count,
    activated: activeSprint.count,
    timeStamp: new Date().toISOString(),
  };
};
