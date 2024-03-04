import { useState } from "react";
import { View } from "../../api/getInitialRequestData";
import {
  RequestDataContent,
  RequestDataMenu,
  RequestDataMenuElement,
  RequestDataWrapper,
} from "./RequestData.styles.ts";
import { ViewData } from "../ViewData/ViewData";
import { File } from "../../api/getListOfRequestFiles";

interface RequestDataProps {
  data: View[];
  files: File[];
}

export const RequestData = ({ data, files }: RequestDataProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <RequestDataWrapper>
      <RequestDataMenu>
        {data.map((e, index) => (
          <RequestDataMenuElement
            key={`${index}: ${e.nameOfView}`}
            onClick={() => handleTabClick(index)}
            isActive={activeTab === index}
          >
            {e.nameOfView}
          </RequestDataMenuElement>
        ))}
      </RequestDataMenu>
      <RequestDataContent>
        <ViewData views={data} activeTab={activeTab} files={files}></ViewData>
      </RequestDataContent>
    </RequestDataWrapper>
  );
};
