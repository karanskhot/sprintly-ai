import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import DialogContainer from "./DialogContainer";
import { BookPlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between py-3">
      <SidebarTrigger />
      <div className="flex items-center gap-2 space-x-3">
        <DialogContainer>
          <Button
            variant={"outline"}
            className="hover:bg-sidebar-accent flex w-full items-center gap-1 transition-colors"
          >
            <BookPlusIcon className="" />
            <span className="hidden text-sm font-medium md:block">Story</span>
          </Button>
        </DialogContainer>
        <UserButton />
      </div>
    </div>
  );
};
export default Navbar;
