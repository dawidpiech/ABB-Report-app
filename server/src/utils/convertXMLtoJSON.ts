import {
  ViewData,
  parseXml,
  getAllValuesOfFields,
  convertViewToObject,
} from "./convertXMLtoJSONsupportFunction";

const convertToJSON = async (
  formXml: string,
  valuesXml: string
): Promise<ViewData[]> => {
  const parsedRequestWorkflow = await parseXml(formXml);
  const parsedRequestValues = await parseXml(valuesXml);
  const result: ViewData[] = [];
  const requestValues = getAllValuesOfFields(parsedRequestValues);

  parsedRequestWorkflow.Form.View.forEach((view: any) => {
    const convertedView = convertViewToObject(view, requestValues);

    if (
      !("HeaderText" in view) ||
      ("HeaderText" in view && view.HeaderText[0] === "Decisions") ||
      ("HeaderText" in view &&
        view.HeaderText[0] === "Configurable Fields - Free to use")
    )
      return;
    result.push(convertedView);
  });

  return result;
};

export { convertToJSON };
