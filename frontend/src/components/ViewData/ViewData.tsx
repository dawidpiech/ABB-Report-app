import { View } from "../../api/getInitialRequestData";
import { GroupData } from "../GroupData/GroupData";
import { ViewWrapper } from "./ViewData.styles";
import { File } from "../../api/getListOfRequestFiles";

interface ViewProps {
  views: View[];
  activeTab: number;
  files: File[];
}

export const ViewData = ({ views, activeTab, files }: ViewProps) => {
  return (
    <>
      {views.map((view, index) => (
        <ViewWrapper key={index} isActive={activeTab === index}>
          {view.groups.map((group, index) => (
            <GroupData key={index} group={group} files={files} />
          ))}
        </ViewWrapper>
      ))}
    </>
  );
};
