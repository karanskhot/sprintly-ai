import { Metadata } from "next";
import QuickAddStoryForm from "../_components/QuickAddStoryForm";
import ActiveStorySection from "./_components/ActiveStorySection";
import { get_active_stories } from "@/dal/story_dal";
import PageHeader from "./_components/PageHeader";

export const metadata: Metadata = {
  title: "Today",
};

const Today = async () => {
  const active_stories = await get_active_stories();
  // to-do: react-suspense

  return (
    <div className="">
      <PageHeader pageHeaderTxt="Today" />
      <ActiveStorySection stories={active_stories} />
      <QuickAddStoryForm />
    </div>
  );
};
export default Today;
