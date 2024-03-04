import { Field } from "../../api/getInitialRequestData";
import { StyledLabel, StyledValue } from "./FileUpload.styles";
import { File } from "../../api/getListOfRequestFiles";

interface FieldProps {
  value: Field;
  listOfFiles: File[];
}

export const FileUpload = ({ value, listOfFiles }: FieldProps) => {
  console.log(listOfFiles);
  return (
    <>
      <StyledLabel>{value.nameOfField}:</StyledLabel>
      <StyledValue></StyledValue>
    </>
  );
};
