import { Story } from "@prisma/client";
import DialogTriggerContainer from "./DialogTriggerContainer";
import { ArchiveXIcon, Circle, CircleCheckBig, GripIcon, Calendar } from "lucide-react";
import { update_user_story } from "@/actions/story";
import { format } from "date-fns";

interface IStoryCardProps {
  story: Story;
  index: number;
}
const StoryCard = ({ story, index }: IStoryCardProps) => {
  return (
    <DialogTriggerContainer key={story.id} type="Edit" storyData={story}>
      <div
        className={`group relative rounded-lg border border-gray-200 bg-white/80 p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-md ${
          story.status === "Completed" ? "opacity-60" : "opacity-100"
        } mb-2`}
      >
        {/* Header */}
        <div className="mb-3 flex items-center justify-between pb-1">
          <div className="flex items-center gap-3">
            <GripIcon className="h-4 w-4 cursor-grab transition-all duration-200 hover:scale-110 hover:text-gray-600" />
            <span className="text-sm font-medium">#{index + 1}</span>
            <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
              {story.priority}
            </span>
          </div>

          <div>
            <ArchiveXIcon
              className="h-4 w-4 cursor-pointer transition-all duration-200 hover:scale-110 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                update_user_story({
                  ...story,
                  id: story.id,
                  notes: story?.notes || "",
                  status: "Archived",
                });
              }}
            />
          </div>
        </div>
        {/* update_user_story({ ...data, id: storyData.id, status: storyData.status }); */}
        {/* Completion Status & Story Name */}
        <div className="mb-3 flex items-center gap-2">
          {story.status === "Completed" ? (
            <CircleCheckBig className="mt-0.5 h-6 w-6 cursor-pointer text-green-600 transition-all duration-200 hover:scale-110" />
          ) : (
            <Circle
              className="hover: mt-0.5 h-6 w-6 cursor-pointer text-blue-600 transition-all duration-200 hover:scale-110"
              strokeWidth={1.3}
              onClick={(e) => {
                e.stopPropagation();
                update_user_story({
                  ...story,
                  id: story.id,
                  notes: story?.notes || "",
                  status: "Completed",
                });
              }}
            />
          )}
          <h3
            className={`flex-1 font-medium capitalize ${
              story.status === "Completed" ? "line-through" : ""
            }`}
          >
            {story.name}
          </h3>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(story.dueDate), "MMM d")}</span>
          </div>

          <span className="rounded border bg-gray-50 px-2 py-1 text-xs text-gray-600">
            {story.status}
          </span>
        </div>

        {/* Notes */}
        {story.notes && (
          <div className="mt-3 border-t border-gray-100 pt-3">
            <p className="line-clamp-2 text-xs">{story.notes}</p>
          </div>
        )}
      </div>
    </DialogTriggerContainer>
  );
};
export default StoryCard;
