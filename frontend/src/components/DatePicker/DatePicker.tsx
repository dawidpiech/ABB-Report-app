import { ChangeEvent } from "react";
import { StyledDatePicker, StyledDatePickerWrapper } from "./DatePicker.styles";
import { Label } from "../Label/Label";
import { FormFieldWrapper } from "../FormFieldWrapper/FormFieldWrapper";
import CalendarIcon from "../../assets/calendar.svg";

interface DatePickerProps {
  label: string;
  value: Date | null;
  width?: number;
  onChange: (
    date: Date | [Date | null, Date | null] | null,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
}

export const DatePicker = ({
  label,
  value,
  width,
  onChange,
}: DatePickerProps) => {
  return (
    <FormFieldWrapper width={width}>
      <Label>{label}</Label>
      <StyledDatePickerWrapper>
        <StyledDatePicker
          selected={value ? new Date(value) : null}
          onChange={onChange}
          showIcon
          icon={<img src={CalendarIcon} alt="SVG Icon" />}
          isClearable={true}
        />
      </StyledDatePickerWrapper>
    </FormFieldWrapper>
  );
};
