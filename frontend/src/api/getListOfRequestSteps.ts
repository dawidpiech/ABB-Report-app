import axios, { AxiosError } from "axios";

export interface RequestStep {
  RequestActivityID: string;
  RequestID: string;
  WorkflowID: string;
  WorkflowVariantID: string;
  WorkflowTransitionID: string;
  WorkflowTransitionName: string;
}

export const getListOfRequestSteps = async (id: string, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const requestData = await axios.get<RequestStep[]>(
      `${import.meta.env.VITE_API}/request/getListOfRequestSteps?id=${id}`,
      { headers: headers }
    );

    return requestData;
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(`${e.message}: ${e.response?.statusText}`);
  }
};
