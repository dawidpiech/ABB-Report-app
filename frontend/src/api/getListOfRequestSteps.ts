import axios, { AxiosError } from "axios";

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
      `${process.env.VITE_API}/request/getListOfRequestSteps?id=${id}`
    );

    return requestData;
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(`${e.message}: ${e.response?.statusText}`);
  }
};
