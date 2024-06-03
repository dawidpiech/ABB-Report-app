import { Group } from "../../api/getInitialRequestData";
import { FieldSection } from "../FieldSection/FieldSection";
import { TableSection } from "../TableSection/TableSection";
import { GroupDataWrapper, SectionDataWrapper } from "./GroupData.styles";
import { File } from "../../api/getListOfRequestFiles";

interface GroupDataProps {
  group: Group;
  files: File[];
}

export const GroupData = ({ group, files }: GroupDataProps) => {
  let groupHaveValues: boolean = false;

  for (const section of group.sections) {
    for (const field of section.fields) {
      if (
        field.values &&
        field.values.length > 0 &&
        field.values[0].value &&
        field.values[0].value !== ""
      ) {
        groupHaveValues = true;
        break;
      }
    }
  }

  if (groupHaveValues)
    return (
      <>
        <GroupDataWrapper>
          {group.name ? <p>{group.name}</p> : ""}
          {group.sections.map((section, index) => (
            <SectionDataWrapper key={index}>
              {section.name ? <h5>{section.name}</h5> : ""}
              {section.typeOfSection === "Field" ? (
                <FieldSection fields={section.fields} files={files} />
              ) : (
                <TableSection data={section.fields} />
              )}
            </SectionDataWrapper>
          ))}
        </GroupDataWrapper>
      </>
    );
  else return null;
};
