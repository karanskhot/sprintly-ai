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
import { Separator } from "@/components/ui/separator";

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
        <SidebarGroupContent className="px-3 py-4">
          <SidebarMenu>
            {nav_links.map((link) => (
              <SidebarMenuItem key={link.link_name}>
                <SidebarMenuButton asChild>
                  <Link
                    href={link.link_url}
                    className="hover:bg-sidebar-accent flex items-center gap-3 rounded-lg px-3 py-3 transition-colors"
                  >
                    <link.icon className="text-sidebar-foreground/70 h-5 w-5" />
                    <span className="text-sm font-medium">{link.link_name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            <Separator className="my-4" />
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <Separator />
      <SidebarFooter className="p-4">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/settings"
                className="hover:bg-sidebar-accent flex items-center gap-3 rounded-lg px-3 py-2 transition-colors"
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
                className="hover:bg-sidebar-accent flex items-center gap-3 rounded-lg px-3 py-2 transition-colors"
              >
                <HelpCircle className="text-sidebar-foreground/70 h-4 w-4" />
                <span className="text-sm">About</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="border-sidebar-border mt-4 border-t pt-4">
          <p className="text-sidebar-foreground/50 text-center text-xs">Powered by Sprintly.ai</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
export default AppSidebar;
