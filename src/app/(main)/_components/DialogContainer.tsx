import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import SprintForm from "./SprintForm";
import StoryForm from "./StoryForm";
import { get_active_scheduled_sprints } from "@/lib/dal/sprints_dal";

interface IDialogTriggerProps {
  children: ReactNode;
  dialogType: string;
}
const DialogContainer = async ({ children, dialogType }: IDialogTriggerProps) => {
  const data = await get_active_scheduled_sprints();
  console.log(data);
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <SidebarMenuItem>
          <SidebarMenuButton className="cursor-pointer text-base">{children}</SidebarMenuButton>
        </SidebarMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="w-full text-center text-2xl">{dialogType}</DialogTitle>
          <DialogDescription></DialogDescription>
          {dialogType === "Sprint" ? <SprintForm /> : <StoryForm />}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default DialogContainer;
