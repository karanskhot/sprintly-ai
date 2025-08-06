import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { nav_links } from "@/data/links";
import { BookPlus, CalendarPlus, HelpCircle, SettingsIcon } from "lucide-react";
import Link from "next/link";
import DialogContainer from "./DialogContainer";
import { Separator } from "@/components/ui/separator";

const AppSidebar = () => {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href={"/today"} className="text-muted-foreground text-2xl font-bold">
              Sprintly.ai
            </Link>
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroupContent className="px-3 py-4">
          <SidebarMenu>
            {nav_links.map((link) => (
              <SidebarMenuItem key={link.link_name}>
                <SidebarMenuButton asChild>
                  <Link href={link.link_url} className="flex items-center">
                    <link.icon />
                    <span className="text-base">{link.link_name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <Separator className="mt-6" />
            <DialogContainer dialogType="Sprint">
              <CalendarPlus />
              New Sprint
            </DialogContainer>
            <DialogContainer dialogType="Story">
              <BookPlus />
              New Story
            </DialogContainer>
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center py-1">
            <SidebarMenuButton asChild>
              <Link href="/setting" className="">
                <SettingsIcon />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center py-1">
            <SidebarMenuButton asChild>
              <Link href="/about" className="">
                <HelpCircle />
                <span>About</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup>
          <SidebarGroupLabel>Powered by Sprintly.ai</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
