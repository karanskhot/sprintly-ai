import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import DialogContainer from "./DialogTriggerContainer";
import { BookPlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-background sticky top-0 z-50 flex items-center justify-between py-3">
      <SidebarTrigger />
      <div className="flex items-center gap-2 space-x-3">
        <DialogContainer type="Create">
          <Button
            variant={"outline"}
            className="hover:bg-sidebar-accent flex w-full items-center gap-1 transition-colors"
          >
            <BookPlusIcon className="" />
            <span className="hidden text-sm font-medium md:block">New Story</span>
          </Button>
        </DialogContainer>
        <UserButton />
      </div>
    </div>
  );
};
export default Navbar;
