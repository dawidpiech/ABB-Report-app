import { Field } from "../../api/getInitialRequestData";
import {
  StyledLabel,
  StyledNewValue,
  StyledOldValue,
  StyledValue,
} from "./SingleLineTextField.styles";

interface FieldProps {
  value: Field;
}

export const SingleLineTextField = ({ value }: FieldProps) => {
  if (value.nameOfField === "Organization Helper") console.log(value);
  return (
    <>
      <StyledLabel>{value.nameOfField}:</StyledLabel>
      <StyledValue>
        {value.values[0].value}
        {value.values[0].isModified ? (
          <StyledOldValue>
            <span>Old Value:</span> {value.values[0].isModified}
          </StyledOldValue>
        ) : (
          ""
        )}
        {value.values[0].isNewValue ? (
          <StyledNewValue>New Value</StyledNewValue>
        ) : (
          ""
        )}
      </StyledValue>
    </>
  );
};
