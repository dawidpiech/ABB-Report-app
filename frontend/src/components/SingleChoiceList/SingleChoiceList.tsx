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
      <StyledLabel>{value.name}:</StyledLabel>
      <StyledValue>
        <StyledRadio></StyledRadio>
        <span>{value.values ? value.values[0].value : ""}</span>
        <div></div>
        {value.values && value.values[0].isModified ? (
          <StyledNewValue>Old Value:</StyledNewValue>
        ) : (
          ""
        )}
        {value.values && value.values[0].isModified ? (
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
