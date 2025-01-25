import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import styled from "@emotion/styled";

export function DatePicker({ label, color }) {
  const [date, setDate] = React.useState(null);

  return (
    <CalendarContainer>
      <CalendarLabel color={color}>{label}</CalendarLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>날짜를 선택해주세요</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </CalendarContainer>
  );
}
const CalendarLabel = styled.div(
  ({ theme, color }) => `
color: ${color === "red" ? "#F64D4D" : theme.colors.neutrals01};
font-weight: 700;
    margin-bottom: 10px;

`
);
const CalendarContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 10px;
`;
