import { Field } from "../../api/getInitialRequestData";
import {
  StyledLabel,
  StyledNewValue,
  StyledOldValue,
  StyledValue,
} from "./ValueNameSelector.styles";

interface FieldProps {
  value: Field;
}

export const ValueNameSelector = ({ value }: FieldProps) => {
  return (
    <>
      <StyledLabel>{value.nameOfField}:</StyledLabel>
      <StyledValue>
        <select disabled>
          <option>{value.values[0].value}</option>
        </select>
        {value.values[0].isModified ? (
          <StyledOldValue>
            <span>Old Value:</span>{" "}
            <select disabled>
              <option>{value.values[0].isModified}</option>
            </select>
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
