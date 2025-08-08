import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import StoryForm from "./StoryForm";
import { Story } from "@prisma/client";

interface IDialogTriggerProps {
  children: ReactNode;
  type: "Create" | "Edit";
  storyData?: Story;
}
const DialogTriggerContainer = ({ children, type, storyData }: IDialogTriggerProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <span className="cursor-pointer text-base">{children}</span>
      </DialogTrigger>
      <DialogContent className="bg-background backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="w-full text-center text-2xl">{"Story"}</DialogTitle>
          <DialogDescription className="w-full text-center">
            {type === "Create" ? "Add new story" : "Update your story"}
          </DialogDescription>
          <StoryForm storyData={storyData} type={type} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default DialogTriggerContainer;
