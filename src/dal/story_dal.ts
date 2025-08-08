import { db } from "@/lib/db";
import { validateUserSession } from "@/lib/validateUser";
import { addDays, startOfDay } from "date-fns";

//A story will remain active for that particular day itself, else it will get archived
export const get_active_stories = async () => {
  const userId = await validateUserSession();
  try {
    const stories = await db.story.findMany({
      where: {
        userId,
        status: "Active",
      },
      orderBy: {
        createdAt: "desc",
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(JSON.stringify(resp));
    return resp;
  } catch (error) {
    console.log(error);
    return [];
  }
};
