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
        if (field.nameOfField === "") return;
        switch (field.typeOfField) {
          case "SingleLineText":
            return (
              <FieldWrapper>
                <SingleLineTextField key={index} value={field} />
              </FieldWrapper>
            );
          case "YesNo":
            return (
              <FieldWrapper>
                <SingleChoiceList key={index} value={field}></SingleChoiceList>
              </FieldWrapper>
            );
          case "SingleChoiceList":
            return (
              <FieldWrapper>
                <SingleChoiceList key={index} value={field}></SingleChoiceList>
              </FieldWrapper>
            );
          case "ValueNameSelector":
            return (
              <FieldWrapper>
                <ValueNameSelector
                  key={index}
                  value={field}
                ></ValueNameSelector>
              </FieldWrapper>
            );
          case "MultiChoiceList":
            return (
              <FieldWrapper>
                <MultiChoiceList key={index} value={field} />
              </FieldWrapper>
            );
          case "MultiLineText":
            return (
              <FieldWrapper>
                <TextArea key={index} value={field} />
              </FieldWrapper>
            );
          case "FileUpload":
            return (
              <FieldWrapper>
                <FileUpload key={index} value={field} listOfFiles={files} />
              </FieldWrapper>
            );
          default:
            return null;
        }
      })}
    </>
  );
};
