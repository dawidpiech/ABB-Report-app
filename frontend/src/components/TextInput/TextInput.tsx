import { ChangeEvent } from "react";
import { StyledInput } from "./TextInput.styles";
import { FormFieldWrapper } from "../FormFieldWrapper/FormFieldWrapper";
import { FormErrorMessage } from "../FormErrorMessage/FormErrorMessage";
import { Label } from "../Label/Label";

interface TextInputProps {
  label: string;
  value: string;
  width?: number;
  error?: boolean;
  errorMessage?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({
  label,
  value,
  width,
  error,
  errorMessage,
  onChange,
}: TextInputProps) => {
  return (
    <FormFieldWrapper width={width}>
      <Label>{label}</Label>
      <StyledInput type="text" value={value} onChange={onChange} />
      {error ? (
        <FormErrorMessage errorMessage={errorMessage}></FormErrorMessage>
      ) : (
        ""
      )}
    </FormFieldWrapper>
  );
};
