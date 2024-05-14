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
  values: FieldValue[];
}

interface FormValues {
  [key: string]: FieldValue[];
}

interface FieldValue {
  value: string;
  isModified?: string;
  isNewValue?: boolean;
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
  let formValues: FormValues = {};
  requestValues.FormData.Field.forEach((field: any) => {
    const fieldId = field.$.ID;
    const initialField = requestInitialValues.FormData.Field.find(
      (obj: any) => obj["$"].ID === fieldId
    );
    let values: FieldValue[] = compareValue(field, initialField);

    formValues[fieldId] = [...values];
  });

  return formValues;
};

//Function to compare values with inital values
export const compareValue = (field: any, initialField: any): FieldValue[] => {
  let result: FieldValue[] = [];

  field.Value.forEach((value: any) => {
    const parsedValue = typeof value === "string" ? value : value._;

    const mappedInitialFieldValue =
      initialField && initialField.Value !== undefined
        ? typeof initialField.Value[0] === "string"
          ? initialField.Value
          : initialField.Value.map((value: any) => value._)
        : [];

    let fieldValue: FieldValue = { value: parsedValue };

    if (
      !mappedInitialFieldValue.includes(parsedValue) &&
      field.Value.length > mappedInitialFieldValue.length &&
      mappedInitialFieldValue.length > 0
    ) {
      fieldValue.isNewValue = true;
    }
    result.push(fieldValue);
  });

  if (initialField && initialField.Value.length > 0) {
    initialField.Value.forEach((value: any, index: number) => {
      const parsedValue = typeof value === "string" ? value : value._;
      const parsedInitialField =
        initialField && initialField.OldValue !== undefined
          ? typeof initialField.OldValue[0] === "string"
            ? [...initialField.OldValue]
            : initialField.OldValue.map((value: any) => value._)
          : [];

      if (
        parsedInitialField.length > 0 &&
        parsedValue &&
        parsedValue !== parsedInitialField[index]
      ) {
        let value = result.find((obj) => obj.value === parsedValue);
        if (value) {
          value.isModified = parsedInitialField[index];
        }
      }
    });
  }
  return result;
};

export const convertViewToObject = (
  view: any,
  requestFieldsValues: FormValues
): ViewData => {
  const viewData: ViewData = {
    nameOfView:
      "HeaderText" in view
        ? typeof view.HeaderText[0] === "string"
          ? view.HeaderText[0]
          : view.HeaderText[0]._
        : "",
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
        nameOfField: field[Object.keys(field)[1]][0].LabelText
          ? field[Object.keys(field)[1]][0].LabelText[0]
          : "",
        values: requestFieldsValues[field.$.ID],
      };

      convertedFields.push(convertedField);
    }
  });
  return convertedFields;
};
