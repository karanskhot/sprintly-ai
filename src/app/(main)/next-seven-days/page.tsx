import { get_stories_next_seven_days } from "@/dal/story_dal";
import PageHeader from "../_components/PageHeader";
import NextSevenDaysSection from "./_components/NextSevenDaysSection";

const NextSevenDays = async () => {
  const stories_next_seven = await get_stories_next_seven_days();
  return (
    <div className="w-full">
      <PageHeader pageHeaderTxt="Next 7 Days" />
      <NextSevenDaysSection data={stories_next_seven} />
    </div>
  );
};
export default NextSevenDays;
