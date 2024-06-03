import {
  ViewData,
  convertFormStructureToJSON,
} from "./convertFormStructureToJSON";
import { convertFormValuesToJSON } from "./convertFormValuesToJSON";
import { parseXml } from "./parseXMLtoJSON";

export const mergeFormWithValues = async (
  formXml: string,
  valuesXml: string,
  initialValuesXml: string,
  fieldsConfigurationList: any[]
): Promise<ViewData[]> => {
  const parsedRequestValues = await parseXml(valuesXml);
  const parsedInitailValuesXml = await parseXml(initialValuesXml);

  const values = await convertFormValuesToJSON(
    parsedRequestValues,
    parsedInitailValuesXml
  );
  const form = await convertFormStructureToJSON(formXml);

  //Add configuration fields label to form
  fieldsConfigurationList.forEach((field) => {
    const referenceToObject = findObjectById(form, field.ID);
    referenceToObject ? (referenceToObject.name = field.Text) : "";
  });

  //Add values to form
  for (const key of Object.keys(values)) {
    const referenceToObject = findObjectById(form, key);
    referenceToObject ? (referenceToObject.values = values[key]) : "";
  }

  return form;
};

type AnyObject = { [key: string]: any };

function findObjectById(
  obj: AnyObject | AnyObject[],
  targetId: string
): AnyObject | undefined {
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const result = findObjectById(item, targetId);
      if (result) {
        return result;
      }
    }
  } else {
    if (obj.ID === targetId) {
      return obj;
    }

    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        const result = findObjectById(obj[key], targetId);
        if (result) {
          return result;
        }
      }
    }
  }
  return undefined;
}
