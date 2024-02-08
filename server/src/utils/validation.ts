import { RequestsListQueryParams } from "../queries/listOfRequestsQuery";

interface ValidationData {
  validationStatus: boolean;
  wronglyValidatedFields: string[];
}

function validateNumberParam(value: any): number {
  const parsedValue = parseInt(value, 10);
  return /^-?\d+$/.test(value) ? parsedValue : -1;
}

function validateDateParam(value: any): Date | boolean {
  const parsedDate = new Date(value);
  return !isNaN(parsedDate.getTime()) ? value : false;
}

function areRequestsParamsValid(
  params: RequestsListQueryParams
): ValidationData {
  let validationData: ValidationData = {
    validationStatus: true,
    wronglyValidatedFields: [],
  };

  for (const [key, value] of Object.entries(params)) {
    if (value === false || value === -1) {
      switch (key) {
        case "id": {
          validationData.wronglyValidatedFields.push("Request ID");
          break;
        }
        case "page": {
          validationData.wronglyValidatedFields.push("Page");
          break;
        }
        case "requestOpenedStartDate": {
          validationData.wronglyValidatedFields.push(
            "Request opened - Start date"
          );
          break;
        }
        case "requestOpenedEndDate": {
          validationData.wronglyValidatedFields.push(
            "Request opened - End date"
          );
          break;
        }
        case "requestClosedStartDate": {
          validationData.wronglyValidatedFields.push(
            "Request closed - Start date"
          );
          break;
        }
        case "requestClosedEndDate": {
          validationData.wronglyValidatedFields.push(
            "Request closed - End date"
          );
          break;
        }
      }
      validationData.validationStatus = false;
    }
  }

  return validationData;
}

export { validateNumberParam, validateDateParam, areRequestsParamsValid };
