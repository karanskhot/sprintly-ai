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
import { HelpCircle, SettingsIcon } from "lucide-react";
import Link from "next/link";

const AppSidebar = () => {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link
              href={"/today"}
              className="text-sidebar-foreground/80 hover:text-sidebar-foreground text-xl font-bold transition-colors"
            >
              Sprintly.ai
            </Link>
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroupContent className="mt-10">
          <SidebarMenu className="space-y-6">
            {nav_links.map((link) => (
              <SidebarMenuItem key={link.link_name}>
                <SidebarMenuButton asChild>
                  <Link
                    href={link.link_url}
                    className="hover:bg-sidebar-accent rounded-lg transition-colors"
                  >
                    <link.icon className="text-sidebar-foreground/70" />
                    <span className="text-base font-medium">{link.link_name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/settings"
                className="hover:bg-sidebar-accent flex items-center rounded-lg transition-colors"
              >
                <SettingsIcon className="text-sidebar-foreground/70 h-4 w-4" />
                <span className="text-sm">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/about"
                className="hover:bg-sidebar-accent flex items-center gap-3 rounded-lg py-2 transition-colors"
              >
                <HelpCircle className="text-sidebar-foreground/70 h-4 w-4" />
                <span className="text-sm">About</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
