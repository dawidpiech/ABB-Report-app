import React, { ChangeEvent } from "react";
import { StyledDatePicker } from "./DatePicker.styles";
import { Label } from "../Label/Label";
import { FieldWrapper } from "../FieldWrapper/FieldWrapper";

interface DatePickerProps {
  label: string;
  value: string;
  width?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DatePicker = ({
  label,
  value,
  width,
  onChange,
}: DatePickerProps) => {
  return (
    <FieldWrapper width={width}>
      <Label>{label}</Label>
      <StyledDatePicker type="date" value={value} onChange={onChange} />
    </FieldWrapper>
  );
};
