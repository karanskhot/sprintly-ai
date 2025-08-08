"use client";
import { get_formatted_seven_days } from "@/lib/date-formatters";
import Column from "./Column";
import { Story } from "@prisma/client";
import { isSameDay } from "date-fns";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { update_user_story } from "@/actions/story";
import { toast } from "sonner";
import { useState } from "react";
import StoryCard from "../../_components/StoryCard";

interface INextSevenDaysSectionProps {
  data: Story[] | [];
}
const NextSevenDaysSection = ({ data }: INextSevenDaysSectionProps) => {
  const col_days = get_formatted_seven_days();
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  // Helper function to filter stories by date
  const getStoriesForDate = (targetDate: Date): Story[] => {
    return data.filter((story) => isSameDay(new Date(story.dueDate), targetDate));
  };

  // Handle drag start event
  const handleDragStart = (event: DragStartEvent) => {
    const storyId = event.active.id as string;
    const story = data.find((s) => s.id === storyId);
    setActiveStory(story || null);
  };

  // Handle drag end event
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveStory(null); // Clear the active story

    if (!over) return; // No valid drop target

    const storyId = active.id as string;
    const targetColumnId = over.id as string;

    // Find the story being dragged
    const story = data.find((s) => s.id === storyId);
    if (!story) return;

    // Parse the target date from the column ID (format: "column-YYYY-MM-DD")
    const targetDateStr = targetColumnId.replace("column-", "");
    const targetDate = new Date(targetDateStr);

    // Check if the story is already in the target column
    if (isSameDay(new Date(story.dueDate), targetDate)) return;

    try {
      // Update the story's due date
      const result = await update_user_story({
        id: story.id,
        name: story.name,
        dueDate: targetDate,
        notes: story.notes || "",
        priority: story.priority,
        status: story.status,
      });

      if (result.success) {
        toast.success("Story moved successfully!");
      } else {
        toast.error("Failed to move story. Please try again.");
      }
    } catch (error) {
      console.error("Error updating story:", error);
      toast.error("Failed to move story. Please try again.");
    }
  };

  console.log("All stories:", data);
  console.log("Column days:", col_days);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <section className="flex w-full gap-4 overflow-x-scroll py-4">
        {col_days.map((col) => (
          <Column date={col} key={col.toISOString()} stories={getStoriesForDate(col)} />
        ))}
      </section>

      <DragOverlay>
        {activeStory ? (
          <div className="scale-105 rotate-6 opacity-90">
            <StoryCard
              story={activeStory}
              index={0}
              isDraggable={false} // Disable drag handles in overlay
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
export default NextSevenDaysSection;
