import { Field } from "../../api/getInitialRequestData";
import {
  StyledLabel,
  StyledNewValue,
  StyledRadio,
  StyledValue,
} from "./SingleChoiceList.styles";

interface FieldProps {
  value: Field;
}

export const SingleChoiceList = ({ value }: FieldProps) => {
  return (
    <>
      <StyledLabel>{value.nameOfField}:</StyledLabel>
      <StyledValue>
        <StyledRadio></StyledRadio>
        <span>{value.values[0].value}</span>
        {value.values[0].isModified ? (
          <StyledNewValue>New Value</StyledNewValue>
        ) : (
          ""
        )}
        {value.values[0].isModified ? (
          <>
            <StyledRadio></StyledRadio>
            <span>{value.values[0].isModified}</span>
          </>
        ) : (
          ""
        )}
      </StyledValue>
    </>
  );
};
