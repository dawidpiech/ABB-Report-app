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

  const viewHaveValuesList: boolean[] = [];

  for (const view of data) {
    let viewHaveValues: boolean = false;
    for (const group of view.groups) {
      for (const section of group.sections) {
        for (const field of section.fields) {
          if (
            field.values &&
            field.values.length > 0 &&
            field.values[0].value !== ""
          ) {
            viewHaveValues = true;
            break;
          }
        }
      }
    }
    viewHaveValuesList.push(viewHaveValues);
  }

  return (
    <RequestDataWrapper>
      <RequestDataMenu>
        {data.map((e, index) =>
          viewHaveValuesList[index] ? (
            <RequestDataMenuElement
              key={`${index}: ${e.nameOfView}`}
              onClick={() => handleTabClick(index)}
              $isActive={activeTab === index}
            >
              {e.nameOfView}
            </RequestDataMenuElement>
          ) : null
        )}
      </RequestDataMenu>
      <RequestDataContent>
        <ViewData views={data} activeTab={activeTab} files={files}></ViewData>
      </RequestDataContent>
    </RequestDataWrapper>
  );
};
