"use client";

import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStorySchema, CreateStoryValues } from "@/lib/validations";

import { create_new_story } from "@/actions/story";

interface IQuickAddStoryProps {
  dueDate: Date;
}
const QuickAddStoryForm = ({ dueDate }: IQuickAddStoryProps) => {
  const { register, handleSubmit, reset } = useForm<CreateStoryValues>({
    resolver: zodResolver(createStorySchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      notes: "",
      dueDate,
      priority: "Medium",
    },
  });

  const onSubmit: SubmitHandler<CreateStoryValues> = async (data) => {
    await create_new_story(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="hover:border-primary bg-secondary/70 flex h-12 items-center justify-between rounded-md border px-2 py-3 shadow">
        <PlusIcon className="text-muted-foreground h-5 w-5" />
        <Input
          placeholder="Quick add story"
          className="border-none shadow-none outline-none focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          {...register("name")}
        />
      </div>
    </form>
  );
};
export default QuickAddStoryForm;
