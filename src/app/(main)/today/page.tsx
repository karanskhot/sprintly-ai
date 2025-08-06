import { bulk_update_sprints } from "@/actions/sprints";

export const metadata = {
  template: "Today",
};
const Today = async () => {
  const { completed } = await bulk_update_sprints();
  console.log(completed);
  return <div>Today : {"completed"}</div>;
};
export default Today;
