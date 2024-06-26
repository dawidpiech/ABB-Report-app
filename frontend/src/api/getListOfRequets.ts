import axios, { AxiosError, AxiosResponse } from "axios";

export interface RequestQuery {
  id?: number;
  requestorName?: string;
  sapCode?: string;
  email?: string;
  page?: number;
  workflowType?: number;
  requestOpenedStartDate?: string;
  requestOpenedEndDate?: string;
  requestClosedStartDate?: string;
  requestClosedEndDate?: string;
}

export interface RequestData {
  count: number;
  requests: Request[];
}

export interface Request {
  RequestID: number;
  WorkflowTypeID: number;
  WorkflowName: string;
  CompanyName: string;
  SAPCode: string;
  RequestorName: string;
  RequestorEmail: string;
  OpenedAt: string | null;
  ClosedAt: string | null;
}

export const getListOfRequests = async (
  data: URLSearchParams,
  token: string
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const requests: AxiosResponse = await axios.get<RequestData>(
      `${import.meta.env.VITE_API}/list/getListOfRequests`,
      {
        params: Object.fromEntries(data.entries()),
        headers: headers,
      }
    );
    return requests;
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(`${e.message}: ${e.response?.statusText}`);
  }
};
