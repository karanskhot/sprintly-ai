import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import SprintForm from "./SprintForm";
import StoryForm from "./StoryForm";
import { get_active_scheduled_sprints } from "@/lib/dal/sprints_dal";

interface IDialogTriggerProps {
  children: ReactNode;
}
const DialogContainer = async ({ children }: IDialogTriggerProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <span className="cursor-pointer text-base">{children}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="w-full text-center text-2xl">{"Story"}</DialogTitle>
          <DialogDescription></DialogDescription>
          <StoryForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default DialogContainer;
