import { parseXml } from "./parseXMLtoJSON";

export interface ViewData {
  name: string;
  ID: string;
  groups: GroupData[];
}

interface GroupData {
  name: string;
  ID: string;
  sections: SectionData[];
}

interface SectionData {
  typeOfSection: string;
  name: string;
  fields: FieldData[];
}

interface FieldData {
  typeOfField: string;
  name: string;
  ID: string;
  values: FieldValue[];
}

export interface FieldValue {
  value: string;
  isModified?: string;
  isNewValue?: boolean;
}

export const convertFormStructureToJSON = async (formXml: string) => {
  const parsedRequestWorkflow = await parseXml(formXml);
  const result: ViewData[] = [];

  parsedRequestWorkflow.Form.View.forEach((view: any) => {
    const convertedView = convertViewToObject(view);

    if (!("HeaderText" in view)) return;
    result.push(convertedView);
  });

  return result;
};

const convertViewToObject = (view: any): ViewData => {
  const viewData: ViewData = {
    name:
      "HeaderText" in view
        ? typeof view.HeaderText[0] === "string"
          ? view.HeaderText[0]
          : view.HeaderText[0]._
        : "",
    ID: view.$.ID,
    groups: [],
  };

  view.Group.forEach((group: any) => {
    const convertedGroup = convertGroupToObject(group);
    viewData.groups.push(convertedGroup);
  });

  return viewData;
};

const convertGroupToObject = (group: any): GroupData => {
  const groupData: GroupData = {
    name: "HeaderText" in group ? group.HeaderText[0] : "",
    ID: group.$.ID,
    sections: [],
  };

  for (let [key, value] of Object.entries(group)) {
    if (key === "Table") {
      if (Array.isArray(value)) {
        value.forEach((table: any) => {
          const convertedSection = convertSectionToObject(
            key,
            table.Field,
            table.HeaderText[0] ? table.HeaderText[0] : ""
          );

          groupData.sections.push(convertedSection);
        });
      }
    }

    if (key === "Field") {
      const convertedSection = convertSectionToObject(key, value, "");

      groupData.sections.push(convertedSection);
    }
  }

  return groupData;
};

const convertSectionToObject = (
  typeOfSection: string,
  value: any,
  name: string = ""
): SectionData => {
  const sectionData: SectionData = {
    typeOfSection: typeOfSection,
    name: name,
    fields: [],
  };

  sectionData.fields = convertFieldsToObject(value);

  return sectionData;
};

const convertFieldsToObject = (fields: any): FieldData[] => {
  const convertedFields: FieldData[] = [];

  fields.forEach((field: any) => {
    if (
      (field.$.IsVisible && field.$.IsVisible === "False") ||
      ("LabelText" in field[Object.keys(field)[1]] &&
        field[Object.keys(field)[1]].LabelText[0] !== "")
    ) {
      return;
    } else {
      const convertedField: FieldData = {
        typeOfField: Object.keys(field)[1],
        name: field[Object.keys(field)[1]][0].LabelText
          ? field[Object.keys(field)[1]][0].LabelText[0]
          : "",
        ID: field.$.ID,
        values: [],
      };

      convertedFields.push(convertedField);
    }
  });

  return convertedFields;
};
