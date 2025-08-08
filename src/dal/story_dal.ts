import { db } from "@/lib/db";
import { validateUserSession } from "@/lib/validateUser";
import { addDays, endOfDay, startOfDay } from "date-fns";

//A story will remain active for that particular day itself, else it will get archived
export const get_active_stories = async () => {
  const userId = await validateUserSession();
  try {
    const stories = await db.story.findMany({
      where: {
        userId,
        status: {
          notIn: ["Archived"],
        },
        dueDate: {
          lte: endOfDay(new Date()),
          gte: startOfDay(new Date()),
        },
      },
      orderBy: {
        status: "desc",
      },
    });
    return stories;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const get_stories_next_seven_days = async () => {
  const userId = await validateUserSession();
  const today = startOfDay(new Date());
  const end_date = addDays(today, 7);
  console.log(`TODAY`, today, `ONE WEEK LATER:`, end_date);
  try {
    const resp = await db.story.findMany({
      where: {
        userId,
        dueDate: {
          gte: today,
          lte: end_date,
        },
        status: { notIn: ["Archived"] },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    return [];
  }
};
