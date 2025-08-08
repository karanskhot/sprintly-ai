import { addDays } from "date-fns";

export const get_formatted_seven_days = () => {
  const dates_arr: Date[] = [];
  const start_today = new Date();
  for (let i = 0; i < 7; i++) {
    const add_day = addDays(start_today, i);
    dates_arr.push(add_day);
  }
  return dates_arr;
};
