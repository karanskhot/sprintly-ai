import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today",
};

const Today = async () => {
  // const { completed } = await bulk_update_sprints();
  return <div>Today : {"completed"}</div>;
};
export default Today;
