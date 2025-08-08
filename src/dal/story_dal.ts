import { db } from "@/lib/db";
import { validateUserSession } from "@/lib/validateUser";

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
