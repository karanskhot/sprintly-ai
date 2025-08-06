import { auth } from "@clerk/nextjs/server";

export const validateUserSession = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error(`User is unauthenticated.`);
  return userId;
};
