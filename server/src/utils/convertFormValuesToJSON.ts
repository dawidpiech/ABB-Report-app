import { FieldValue } from "./convertFormStructureToJSON";

interface FormValues {
  [key: string]: FieldValue[];
}

//Function to get all Values of request
export const convertFormValuesToJSON = async (
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
const compareValue = (field: any, initialField: any): FieldValue[] => {
  let result: FieldValue[] = [];

  field.Value.forEach((value: any) => {
    const parsedValue =
      typeof value === "string" ? value : decodeURIComponent(value.$.ValueText);

    const mappedInitialFieldValue =
      initialField && initialField.Value !== undefined
        ? typeof initialField.Value[0] === "string"
          ? initialField.Value
          : initialField.Value.map((value: any) => {
              value.$ && value.$.ValueText
                ? decodeURIComponent(value.$.ValueText)
                : value._;
            })
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
