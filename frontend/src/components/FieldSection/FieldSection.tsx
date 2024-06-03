import { Field } from "../../api/getInitialRequestData";
import { FieldWrapper } from "../FieldWrapper/FieldWrapper";
import { MultiChoiceList } from "../MultiChoiceList/MultiChoiceList";
import { SingleChoiceList } from "../SingleChoiceList/SingleChoiceList";
import { SingleLineTextField } from "../SingleLineTextField/SingleLineTextField";
import { TextArea } from "../TextArea/TextArea";
import { ValueNameSelector } from "../ValueNameSelector/ValueNameSelector";
import { File } from "../../api/getListOfRequestFiles";
import { FileUpload } from "../FileUpload/FileUpload";

interface FieldSectionProps {
  fields: Field[];
  files: File[];
}

export const FieldSection = ({ fields, files }: FieldSectionProps) => {
  return (
    <>
      {fields.map((field, index) => {
        if (
          field.name === "" ||
          (field.values &&
            field.values.length === 1 &&
            field.values[0].value === "")
        )
          return null;
        switch (field.typeOfField) {
          case "SingleLineText":
            return (
              <FieldWrapper key={index}>
                <SingleLineTextField key={index} value={field} />
              </FieldWrapper>
            );
          case "YesNo":
            return (
              <FieldWrapper key={index}>
                <SingleChoiceList value={field}></SingleChoiceList>
              </FieldWrapper>
            );
          case "SingleChoiceList":
            return (
              <FieldWrapper key={index}>
                <SingleChoiceList value={field}></SingleChoiceList>
              </FieldWrapper>
            );
          case "ValueNameSelector":
            return (
              <FieldWrapper key={index}>
                <ValueNameSelector value={field}></ValueNameSelector>
              </FieldWrapper>
            );
          case "MultiChoiceList":
            return (
              <FieldWrapper key={index}>
                <MultiChoiceList value={field} />
              </FieldWrapper>
            );
          case "MultiLineText":
            return (
              <FieldWrapper key={index}>
                <TextArea value={field} />
              </FieldWrapper>
            );
          case "FileUpload":
            return <FileUpload key={index} value={field} listOfFiles={files} />;
          default:
            return null;
        }
      })}
    </>
  );
};
