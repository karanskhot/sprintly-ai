import { BookText, CalendarClock, LucideIcon, TargetIcon } from "lucide-react";

export const nav_links: {
  link_name: string;
  link_url: string;
  icon: LucideIcon;
}[] = [
  { link_name: "Today", link_url: "/today", icon: TargetIcon },
  { link_name: "Sprints", link_url: "/sprints", icon: CalendarClock },
  { link_name: "All Stories", link_url: "/all-stories", icon: BookText },
];
