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
  return (
    <>
      <GroupDataWrapper>
        {group.nameOfGroup ? <p>{group.nameOfGroup}</p> : ""}
        {group.sections.map((section, index) => (
          <SectionDataWrapper key={index}>
            {section.nameOfSection ? <h5>{section.nameOfSection}</h5> : ""}
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
};
