import {
  ViewData,
  parseXml,
  getAllValuesOfFields,
  convertViewToObject,
} from "./convertXMLtoJSONsupportFunction";

const convertToJSON = async (
  formXml: string,
  valuesXml: string,
  initailValuesXml: string
): Promise<ViewData[]> => {
  const parsedRequestWorkflow = await parseXml(formXml);
  const parsedRequestValues = await parseXml(valuesXml);
  const parsedInitailValuesXml = await parseXml(initailValuesXml);
  const result: ViewData[] = [];
  const requestValues = getAllValuesOfFields(
    parsedRequestValues,
    parsedInitailValuesXml
  );

  parsedRequestWorkflow.Form.View.forEach((view: any) => {
    const convertedView = convertViewToObject(view, requestValues);

    if (!("HeaderText" in view)) return;
    result.push(convertedView);
  });

  return result;
};

export { convertToJSON };
