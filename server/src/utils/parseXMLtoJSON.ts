import { parseString } from "xml2js";

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
