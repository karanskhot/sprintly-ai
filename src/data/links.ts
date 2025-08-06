import { BookText, LucideCalendarSync, LucideIcon, TargetIcon } from "lucide-react";

export const nav_links: {
  link_name: string;
  link_url: string;
  icon: LucideIcon;
}[] = [
  { link_name: "Today", link_url: "/today", icon: TargetIcon },
  { link_name: "Next seven days", link_url: "/next-seven-days", icon: LucideCalendarSync },
  { link_name: "All Stories", link_url: "/all-stories", icon: BookText },
];

export const hourly_times = Array.from({ length: 24 }, (_, i) => {
  const hour = i === 0 ? 12 : i > 12 ? i - 12 : i;
  const period = i < 12 ? "AM" : "PM";
  return `${hour}:00 ${period}`;
});
