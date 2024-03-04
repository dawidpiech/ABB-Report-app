import { Field } from "../../api/getInitialRequestData";
import {
  StyledLabel,
  StyledNewValue,
  StyledOldValue,
  StyledValue,
} from "./TextArea.styles";

interface FieldProps {
  value: Field;
}

export const TextArea = ({ value }: FieldProps) => {
  return (
    <>
      <StyledLabel>{value.nameOfField}:</StyledLabel>
      <StyledValue>
        <p>{value.values[0].value}</p>
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
