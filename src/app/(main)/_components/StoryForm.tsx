"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createStorySchema, CreateStoryValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sprint } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const StoryForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CreateStoryValues>({
    resolver: zodResolver(createStorySchema),
    defaultValues: {
      name: "",
      notes: "",
      dueDate: new Date(),
      priority: "Low",
      reminders: false,
    },
  });

  return <form className="flex w-full max-w-xl flex-col gap-4"></form>;
};
export default StoryForm;
