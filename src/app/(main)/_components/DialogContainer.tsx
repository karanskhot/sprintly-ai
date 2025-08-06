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
