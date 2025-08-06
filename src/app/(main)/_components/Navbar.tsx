import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 flex items-start justify-between py-3">
      <SidebarTrigger />
      <UserButton />
    </div>
  );
};
export default Navbar;
