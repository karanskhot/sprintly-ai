import { Story } from "@prisma/client";
import QuickAddStoryForm from "../../_components/QuickAddStoryForm";
import { format } from "date-fns";
import StoryCard from "../../_components/StoryCard";
import { useDroppable } from "@dnd-kit/core";

interface IColumnProps {
  date: Date;
  stories: Story[];
}
const Column = ({ date, stories }: IColumnProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `column-${date.toISOString()}`,
    data: {
      type: "column",
      date: date,
    },
  });

  return (
    <div className="h-fit w-3/4 flex-none overflow-hidden rounded-xl lg:w-[45%] xl:w-[30%] 2xl:w-[20%]">
      <div className="flex h-full flex-col justify-between">
        <div className="flex justify-between bg-green-300/70 p-4">
          <h1 className="text-lg font-semibold">{format(date, "EEEE")}</h1>
          <p>{format(date, "do MMM")}</p>
        </div>
        <div
          ref={setNodeRef}
          className={`bg-secondary/50 min-h-40 flex-1 space-y-2 p-2 transition-colors ${
            isOver ? "bg-transparent/70" : ""
          }`}
        >
          {stories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))}
        </div>
        <div className="bg-green-300/70 p-2">
          <QuickAddStoryForm dueDate={date} />
        </div>
      </div>
    </div>
  );
};
export default Column;
