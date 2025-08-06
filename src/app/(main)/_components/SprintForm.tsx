"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CustomDatepicker from "./CustomDatepicker";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createSprintSchema, CreateSprintValues } from "@/lib/validations";
import { addDays, format } from "date-fns";
import { create_new_sprint } from "@/actions/sprints";
import { toast } from "sonner";

const SprintForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    // formState: { errors, isSubmitting },
  } = useForm<CreateSprintValues>({
    resolver: zodResolver(createSprintSchema),
    defaultValues: {
      name: "",
      notes: "",
      start_date: new Date(),
    },
  });
  const selected_date = watch("start_date");
  console.log(selected_date, "sprint form");
  const onSubmit: SubmitHandler<CreateSprintValues> = async (data) => {
    const { message, success } = await create_new_sprint(data);
    if (success) {
      toast.success(message);
      reset();
    }
  };
  return (
    <form className="flex w-full max-w-xl flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="sprintName" className="font-medium">
          Name
        </Label>
        <Input placeholder="my-new-sprint-for-week" {...register("name")} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="sprintDescription" className="font-medium">
          Description
        </Label>
        <Textarea />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Label htmlFor="start_date" className="font-medium">
            Start Date
          </Label>
          <CustomDatepicker
            isStrict={true}
            value={selected_date}
            onChange={(date) => setValue("start_date", date || new Date())}
            className="h-full w-fit px-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="end_date" className="font-medium">
            Ends on:
          </Label>
          <span className="text-base">
            {format(addDays(getValues("start_date"), 6), "do MMM yy")}
          </span>
        </div>
      </div>
      <DialogFooter className="space-x-3">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Close
          </Button>
        </DialogClose>
        <Button type="submit">Confirm</Button>
      </DialogFooter>
    </form>
  );
};
export default SprintForm;
