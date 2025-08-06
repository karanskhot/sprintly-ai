import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "./_components/Navbar";
import AppSidebar from "./_components/AppSidebar";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex w-full flex-col px-3">
        <Navbar />
        <div className="mx-auto w-full flex-1 border">{children}</div>
      </div>
    </SidebarProvider>
  );
};
export default layout;
