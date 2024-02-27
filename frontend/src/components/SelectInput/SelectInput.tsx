import { ChangeEvent } from "react";
import { FieldWrapper } from "../FieldWrapper/FieldWrapper";
import { StyledOption, StyledSelect } from "./SelectInput.styles";
import { Label } from "../Label/Label";

interface SelectInputProps {
  label: string;
  options: { [key: string]: string };
  value: string;
  width?: number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectInput = ({
  label,
  options,
  value,
  onChange,
  width,
}: SelectInputProps) => {
  return (
    <FieldWrapper width={width}>
      <Label>{label}</Label>
      <StyledSelect value={value} onChange={onChange}>
        <StyledOption key="disabled" value={""} disabled hidden>
          {`Select ${label}`}
        </StyledOption>
        <StyledOption key="" value={""}></StyledOption>
        {Object.entries(options).map(([key, value]) => (
          <StyledOption key={key} value={key}>
            {value}
          </StyledOption>
        ))}
      </StyledSelect>
    </FieldWrapper>
  );
};
