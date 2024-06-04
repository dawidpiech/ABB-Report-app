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
  return (
    <>
      <StyledLabel>{value.name}:</StyledLabel>
      {value.values && value.values[0] ? (
        <StyledValue>
          {value.values[0].value}
          {value.values[0] && value.values[0].isModified ? (
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
      ) : (
        ""
      )}
    </>
  );
};
