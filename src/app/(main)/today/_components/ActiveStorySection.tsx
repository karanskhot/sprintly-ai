"use client";
import { Story } from "@prisma/client";
import { ArchiveXIcon, Circle } from "lucide-react";
import MetricsSection from "./MetricsSection";
import DialogContainer from "../../_components/DialogTriggerContainer";
import { update_user_story } from "@/actions/story";

interface IActiveStorySectionProps {
  stories: Story[];
}

const ActiveStorySection = ({ stories }: IActiveStorySectionProps) => {
  return (
    <div className="grid h-[calc(100svh-12rem)] grid-cols-1 gap-3 py-3 md:grid-cols-4">
      <div className="bg-secondary col-span-2 space-y-2 overflow-y-auto rounded-2xl p-3">
        {stories.map((story, index) => (
          <DialogContainer key={story.id} type="Edit" storyData={story}>
            <div
              className={`${story.status === "Completed" ? "opacity-50" : "opacity-100"} border-secondary mb-2 flex h-12 items-center justify-between rounded-md ${story.priority === "High" ? "border-l-orange-600" : story.priority === "Low" ? "border-l-green-600" : "border-l-stone-400"} border-l-8 bg-white px-2 py-3 shadow transition-shadow duration-300 hover:shadow-lg`}
              key={story.id}
            >
              <div className="flex items-center">
                <h2 className="w-[40px] text-4xl font-semibold">{index + 1}.</h2>
                <div className="ml-3 flex items-center justify-center gap-2">
                  <Circle
                    strokeWidth={1.5}
                    onClick={(e) => {
                      (e.stopPropagation(),
                        update_user_story({
                          ...story,
                          id: story?.id,
                          status: "Completed",
                          notes: story.notes ?? "",
                        }));
                    }}
                    className="cursor-pointer text-green-600 transition-colors hover:text-blue-600"
                  />
                  <p className="max-w-[200px] truncate text-[14px] capitalize hover:font-semibold">
                    {story.name}
                  </p>
                </div>
              </div>
              <div className="">
                <ArchiveXIcon
                  className="cursor-pointer opacity-50 hover:text-red-600 hover:opacity-100"
                  size={15}
                  onClick={(e) => {
                    (e.stopPropagation(),
                      update_user_story({
                        ...story,
                        id: story?.id,
                        status: "Archived",
                        notes: story.notes ?? "",
                      }));
                  }}
                />
              </div>
            </div>
          </DialogContainer>
        ))}
      </div>
      <div className="bg-secondary col-span-2 space-y-2 overflow-y-auto rounded-2xl border p-3">
        <MetricsSection />
      </div>
    </div>
  );
};
export default ActiveStorySection;
