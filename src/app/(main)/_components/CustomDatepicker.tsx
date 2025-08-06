"use client";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { startOfDay, format } from "date-fns";

interface CustomDatepickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  className?: string;
  isStrict: boolean;
}

const CustomDatepicker = ({ value, onChange, isStrict, className }: CustomDatepickerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" id="date" className={className}>
            {value ? format(value, "do MMM, yy") : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            disabled={isStrict ? (date) => date < startOfDay(new Date()) : false}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            className={className}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default CustomDatepicker;
