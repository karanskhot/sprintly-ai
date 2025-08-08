import { Story } from "@prisma/client";
import DialogTriggerContainer from "./DialogTriggerContainer";
import { ArchiveXIcon, Circle, CircleCheckBig, GripVertical } from "lucide-react";
import { update_user_story } from "@/actions/story";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface IStoryCardProps {
  story: Story;
  index: number;
  isDraggable?: boolean;
}
const StoryCard = ({ story, index, isDraggable = true }: IStoryCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: story.id,
    data: {
      type: "story",
      story: story,
    },
    disabled: !isDraggable,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };
  // Get priority-based styling
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "High":
        return {
          background: "bg-red-50",
          border: "border-red-200",
          hoverBorder: "hover:border-red-300",
        };
      case "Medium":
        return {
          background: "bg-yellow-50",
          border: "border-yellow-200",
          hoverBorder: "hover:border-yellow-300",
        };
      case "Low":
        return {
          background: "bg-green-50",
          border: "border-green-200",
          hoverBorder: "hover:border-green-300",
        };
      default:
        return {
          background: "bg-white",
          border: "border-gray-200",
          hoverBorder: "hover:border-gray-300",
        };
    }
  };

  const priorityStyles = getPriorityStyles(story.priority);

  return (
    <DialogTriggerContainer key={story.id} type="Edit" storyData={story}>
      <div
        ref={setNodeRef}
        style={style}
        className={`group ${priorityStyles.background} rounded-md border ${priorityStyles.border} h-12 px-3 shadow-sm transition-all duration-200 hover:shadow-md ${priorityStyles.hoverBorder} ${
          story.status === "Completed" ? "opacity-60" : "opacity-100"
        } ${isDragging ? "scale-105 rotate-2 opacity-50" : ""} mb-2`}
      >
        {/* Priority indicator line */}
        <div
          className={`absolute top-0 left-0 h-full w-1 rounded-l-md ${
            story.priority === "High"
              ? "bg-red-500"
              : story.priority === "Medium"
                ? "bg-yellow-500"
                : "bg-green-500"
          }`}
        />

        <div className="ml-1 flex h-full items-center justify-between gap-3">
          {/* Left side - drag handle, count, complete button, and story name */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {/* Drag handle */}
            {isDraggable && (
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab opacity-50 transition-opacity hover:opacity-100 active:cursor-grabbing"
              >
                <GripVertical size={14} className="text-gray-400" />
              </div>
            )}
            {/* Count */}
            <span className="w-4 text-center text-xs font-semibold text-gray-500">
              {index + 1}
            </span>{" "}
            {/* Complete button */}
            {story.status !== "Completed" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  update_user_story({
                    ...story,
                    id: story?.id,
                    status: "Completed",
                    notes: story.notes ?? "",
                  });
                }}
                className="text-gray-400 transition-all duration-200 hover:scale-110 hover:text-green-600 active:scale-95"
                title="Mark complete"
              >
                <Circle size={16} className="stroke-2" />
              </button>
            ) : (
              <div className="animate-pulse text-green-600">
                <CircleCheckBig size={16} />
              </div>
            )}
            {/* Story name */}
            <h3 className="flex-1 truncate text-sm font-medium text-gray-900">{story.name}</h3>
          </div>

          {/* Right side - archive button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              update_user_story({
                ...story,
                id: story?.id,
                status: "Archived",
                notes: story.notes ?? "",
              });
            }}
            className="text-gray-400 transition-all duration-200 hover:scale-110 hover:text-red-500 active:scale-95"
            title="Archive story"
          >
            <ArchiveXIcon size={16} />
          </button>
        </div>
      </div>
    </DialogTriggerContainer>
  );
};
export default StoryCard;
