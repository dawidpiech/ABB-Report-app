import { Field } from "../../api/getInitialRequestData";
import {
  StyledInputCheckbox,
  StyledInputCheckboxWraper,
  StyledLabel,
  StyledNewValue,
  StyledOldValue,
  StyledValue,
} from "./MultiChoiceList.styles";

interface FieldProps {
  value: Field;
}

export const MultiChoiceList = ({ value }: FieldProps) => {
  return (
    <>
      <StyledLabel>{value.nameOfField}:</StyledLabel>
      <StyledValue>
        {value.values.map((value, index) => (
          <StyledInputCheckboxWraper key={index}>
            <StyledInputCheckbox type="checkbox" defaultChecked />
            <label>{value.value}</label>
          </StyledInputCheckboxWraper>
        ))}

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
