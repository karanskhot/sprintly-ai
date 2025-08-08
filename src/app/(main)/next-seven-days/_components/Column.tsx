import { Story } from "@prisma/client";
import QuickAddStoryForm from "../../_components/QuickAddStoryForm";
import { format } from "date-fns";
import StoryCard from "../../_components/StoryCard";

interface IColumnProps {
  date: Date;
  stories: Story[];
}
const Column = ({ date, stories }: IColumnProps) => {
  return (
    <div className="h-fit w-3/4 flex-none overflow-hidden rounded-xl lg:w-[45%] xl:w-[30%] 2xl:w-[20%]">
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between bg-stone-300 px-4 py-2 shadow-2xl">
          <h1 className="text-lg font-semibold">{format(date, "EEEE")}</h1>
          <p>{format(date, "do MMM")}</p>
        </div>
        <div className="min-h-40 flex-1 space-y-2 overflow-y-scroll bg-stone-300 p-2">
          {stories.map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              index={index} // Assuming index is not used, you can modify this as needed
            />
          ))}
        </div>
        <div className="bg-stone-300 px-4 py-2">
          <QuickAddStoryForm dueDate={date} />
        </div>
      </div>
    </div>
  );
};
export default Column;
