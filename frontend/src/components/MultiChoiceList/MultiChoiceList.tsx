import { Field } from "../../api/getInitialRequestData";
import {
  StyledInputCheckbox,
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
        {value.values.map((value) => (
          <>
            <StyledInputCheckbox type="checkbox" checked />
            <label>{value.value}</label>
          </>
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
