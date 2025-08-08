"use client";
import { Story } from "@prisma/client";
import MetricsSection from "./MetricsSection";

import StoryCard from "../../_components/StoryCard";

interface IActiveStorySectionProps {
  stories: Story[];
}

const ActiveStorySection = ({ stories }: IActiveStorySectionProps) => {
  return (
    <div className="grid h-[calc(100svh-12rem)] grid-cols-1 gap-3 py-3 lg:grid-cols-4">
      <div className="bg-secondary/50 col-span-1 space-y-2 overflow-y-auto rounded-2xl p-3 lg:col-span-2">
        {stories.map((story, index) => (
          <StoryCard story={story} index={index} key={story.id} />
        ))}
      </div>
      <div className="bg-secondary/50 col-span-1 space-y-2 overflow-y-auto rounded-2xl p-3 lg:col-span-2">
        <MetricsSection />
      </div>
    </div>
  );
};
export default ActiveStorySection;
