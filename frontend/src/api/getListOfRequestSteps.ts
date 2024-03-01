import axios from "axios";

export interface RequestStep {
  RequestID: string;
  WorkflowID: string;
  WorkflowVariantID: string;
  WorkflowTransitionID: string;
  WorkflowTransitionName: string;
}

export const getListOfRequestSteps = async (id: string) => {
  try {
    const requestData = await axios.get<RequestStep[]>(
      `http://localhost:3000/api/request/getListOfRequestSteps?id=${id}`
    );

    return requestData;
  } catch (error) {
    console.log("Błąd podczas pobierania danych z API", error);
  }
};
