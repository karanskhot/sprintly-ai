"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createStorySchema, CreateStoryValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomDatepicker from "./CustomDatepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Priority, Story } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { create_new_story, update_user_story } from "@/actions/story";

interface IStoryFormProps {
  storyData?: Story;
  type: "Create" | "Edit";
}
const StoryForm = ({ storyData, type }: IStoryFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateStoryValues>({
    resolver: zodResolver(createStorySchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: storyData?.name || "",
      notes: storyData?.notes || "",
      dueDate: storyData?.dueDate || new Date(),
      priority: storyData?.priority || "Medium",
    },
  });

  const onSubmit: SubmitHandler<CreateStoryValues> = async (data) => {
    if (type === "Create") {
      await create_new_story(data);
    } else if (type === "Edit" && storyData?.id) {
      await update_user_story({ ...data, id: storyData.id, status: storyData.status });
    }
  };
  return (
    <form className="w-full max-w-lg space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1">
        <Label className="text-base" htmlFor="name">
          Name
        </Label>
        <Input {...register("name")} autoComplete="false" autoFocus={true} />
      </div>
      <div className="flex items-center justify-between gap-6 space-y-1">
        <div className="w-1/2 space-y-1">
          <Label className="text-base" htmlFor="dueDate">
            Due Date
          </Label>
          <CustomDatepicker
            isStrict={false}
            value={watch("dueDate")}
            onChange={(date) => setValue("dueDate", date ? date : new Date())}
          />
        </div>
        <div className="w-1/2 space-y-1">
          <Label className="text-base" htmlFor="priority">
            Priority
          </Label>
          <Select
            value={watch("priority")}
            onValueChange={(value) => setValue("priority", value as Priority)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Low" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-base" htmlFor="notes">
          Notes
        </Label>
        <Textarea {...register("notes")} className="min-h-48" />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">{type === "Create" ? "Create Story" : "Save Changes"}</Button>
      </DialogFooter>
    </form>
  );
};
export default StoryForm;
