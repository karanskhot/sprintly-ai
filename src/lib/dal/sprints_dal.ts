import { Sprint } from "@prisma/client";
import { db } from "../db";
import { validateUserSession } from "../validateUser";

export const get_active_scheduled_sprints = async (): Promise<{
  success: true;
  data: Sprint[] | null;
}> => {
  const userId = await validateUserSession();
  try {
    const all_sprints = await db.sprint.findMany({
      where: {
        userId,
        status: { in: ["Active", "Scheduled"] },
      },
      include: {
        stories: true,
      },
      orderBy: {
        status: "asc",
      },
    });
    return { success: true, data: all_sprints };
  } catch (error) {
    console.log(error);
    return { success: true, data: null };
  }
};
