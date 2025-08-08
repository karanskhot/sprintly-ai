"use client";
import { get_formatted_seven_days } from "@/lib/date-formatters";
import Column from "./Column";
import { Story } from "@prisma/client";
import { isSameDay } from "date-fns";

interface INextSevenDaysSectionProps {
  data: Story[] | [];
}
const NextSevenDaysSection = ({ data }: INextSevenDaysSectionProps) => {
  const col_days = get_formatted_seven_days();

  // Helper function to filter stories by date
  const getStoriesForDate = (targetDate: Date): Story[] => {
    return data.filter((story) => isSameDay(new Date(story.dueDate), targetDate));
  };

  console.log("All stories:", data);
  console.log("Column days:", col_days);

  return (
    <section className="flex w-full gap-4 overflow-x-scroll py-4">
      {col_days.map((col) => (
        <Column date={col} key={col.toISOString()} stories={getStoriesForDate(col)} />
      ))}
    </section>
  );
};
export default NextSevenDaysSection;
