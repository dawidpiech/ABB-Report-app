import { parseString } from "xml2js";

export interface ViewData {
  nameOfView: string;
  groups: GroupData[];
}

interface GroupData {
  nameOfGroup: string;
  sections: SectionData[];
}

interface SectionData {
  typeOfSection: string;
  nameOfSection: string;
  fields: FieldData[];
}

interface FieldData {
  typeOfField: string;
  nameOfField: string;
  values: string[];
}

interface FormValues {
  [key: string]: string[];
}

//Function to parse XML to JSON object
export const parseXml = async (xmlString: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    parseString(xmlString, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

//Function to get all Values of request
export const getAllValuesOfFields = (
  requestValues: any,
  requestInitialValues: any
) => {
  const formValues: FormValues = {};
  requestValues.FormData.Field.forEach((field: any) => {
    const fieldId = field.$.ID;
    const values: string[] = [...field.Value];

    formValues[fieldId] = values;
  });

  return formValues;
};

export const convertViewToObject = (
  view: any,
  requestFieldsValues: FormValues
): ViewData => {
  const viewData: ViewData = {
    nameOfView: "HeaderText" in view ? view.HeaderText[0] : "",
    groups: [],
  };

  view.Group.forEach((group: any) => {
    const convertedGroup = convertGroupToObject(group, requestFieldsValues);
    viewData.groups.push(convertedGroup);
  });

  return viewData;
};

const convertGroupToObject = (
  group: any,
  requestFieldsValues: FormValues
): GroupData => {
  const groupData: GroupData = {
    nameOfGroup: "HeaderText" in group ? group.HeaderText[0] : "",
    sections: [],
  };

  for (let [key, value] of Object.entries(group)) {
    if (key === "Table") {
      if (Array.isArray(value)) {
        value.forEach((table: any) => {
          const convertedSection = convertSectionToObject(
            key,
            table.Field,
            table.HeaderText[0] ? table.HeaderText[0] : "",
            requestFieldsValues
          );

          groupData.sections.push(convertedSection);
        });
      }
    }

    if (key === "Field") {
      const convertedSection = convertSectionToObject(
        key,
        value,
        "",
        requestFieldsValues
      );

      groupData.sections.push(convertedSection);
    }
  }

  return groupData;
};

const convertSectionToObject = (
  typeOfSection: string,
  value: any,
  nameOfSection: string = "",
  requestFieldsValues: FormValues
): SectionData => {
  const sectionData: SectionData = {
    typeOfSection: typeOfSection,
    nameOfSection: nameOfSection,
    fields: [],
  };

  sectionData.fields = convertFieldsToObject(value, requestFieldsValues);

  return sectionData;
};

const convertFieldsToObject = (
  fields: any,
  requestFieldsValues: FormValues
): FieldData[] => {
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
        nameOfField: field[Object.keys(field)[1]][0].LabelText[0],
        values: requestFieldsValues[field.$.ID],
      };

      convertedFields.push(convertedField);
    }
  });
  return convertedFields;
};
