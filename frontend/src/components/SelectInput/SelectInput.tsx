import React, { ChangeEvent } from "react";
import { FieldWrapper } from "../FieldWrapper/FieldWrapper";
import { StyledSelect } from "./SelectInput.styles";
import { Label } from "../Label/Label";

interface SelectInputProps {
  label: string;
  options: { [key: string]: string };
  value: string;
  width?: number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  value,
  onChange,
  width,
}) => {
  console.log(options);
  return (
    <FieldWrapper width={width}>
      <Label>{label}</Label>
      <StyledSelect value={value} onChange={onChange}>
        <option value={""} disabled hidden>
          {`Select ${label}`}
        </option>
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </StyledSelect>
    </FieldWrapper>
  );
};
