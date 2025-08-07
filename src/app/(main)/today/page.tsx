import { Metadata } from "next";
import HeroSection from "./_components/HeroSection";
import QuickAddStoryForm from "../_components/QuickAddStoryForm";
import ActiveStorySection from "./_components/ActiveStorySection";
import { get_active_stories } from "@/dal/story_dal";
import MetricsSection from "./_components/MetricsSection";

export const metadata: Metadata = {
  title: "Today",
};

const Today = async () => {
  const active_stories = await get_active_stories();
  return (
    <div className="space-y-2">
      <HeroSection />
      <section className="">
        <ActiveStorySection stories={active_stories} />

        <QuickAddStoryForm />
      </section>
    </div>
  );
};
export default Today;
