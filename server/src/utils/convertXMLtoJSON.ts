import { parseString } from "xml2js";

interface FieldData {
  typeOfField: string;
  nameOfField: string;
  value: string[];
}

interface FormData {
  [key: string]: string[];
}

interface GroupData {
  nameOfGroup: string;
  fields: FieldData[];
}

interface ViewData {
  nameOfView: string;
  groups: GroupData[];
}

const parseXml = async (xmlString: string): Promise<any> => {
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

const convertToJSON = async (
  formXml: string,
  dataXml: string
): Promise<ViewData[]> => {
  const formResult = await parseXml(formXml);
  const dataResult = await parseXml(dataXml);

  const formData: FormData = {};
  dataResult.FormData.Field.forEach((field: any) => {
    const fieldId = field.$.ID;
    const values: string[] = [];

    field.Value.forEach((value: any) => {
      const kaeysOfFields = Object.keys(value);
      const valueData =
        typeof field.Value[0] === "string"
          ? field.Value[0]
          : kaeysOfFields.includes("_")
          ? field.Value[0]._
          : "";
      values.push(valueData);
    });

    formData[fieldId] = values;
  });

  const result: ViewData[] = [];
  formResult.Form.View.forEach((view: any) => {
    const viewData: ViewData = {
      nameOfView: "HeaderText" in view ? view.HeaderText[0] : "",
      groups: [],
    };

    if (
      !("HeaderText" in view) ||
      ("HeaderText" in view && view.HeaderText[0] === "Decisions") ||
      ("HeaderText" in view &&
        view.HeaderText[0] === "Configurable Fields - Free to use")
    )
      return;

    const group = view.Group;
    if (group) {
      group.forEach((group: any) => {
        const groupData: GroupData = {
          nameOfGroup: "HeaderText" in group ? group.HeaderText[0] : "",
          fields: [],
        };

        if (group.Field) {
          group.Field.forEach((field: any) => {
            if (field.$.IsVisible && field.$.IsVisible === "False") {
              return;
            } else {
              const fieldName = Object.values(field)[1] as Record<string, any>;
              const fieldData: FieldData = {
                typeOfField: Object.keys(field)[1],
                nameOfField:
                  "LabelText" in fieldName[0] ? fieldName[0].LabelText[0] : "",
                value: formData[field.$.ID],
              };
              groupData.fields.push(fieldData);
            }
          });
        }
        viewData.groups.push(groupData);
      });
    }
    result.push(viewData);
  });

  return result;
};

export { convertToJSON };
