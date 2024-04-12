import axios, { AxiosError } from "axios";
import { WorkFlowTypesList } from "../components/SearchForm/SearchForm";

interface WorkflowData {
  WorkflowID: string;
  NodeName: string;
}

export const getListOfWorkflowTypes = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const workflowTypes = await axios.get<WorkflowData[]>(
      `${import.meta.env.VITE_API}/list/getListOfWorkflows`,
      { headers: headers }
    );

    const workflowTypesList: WorkFlowTypesList = Object.fromEntries(
      workflowTypes.data.map(
        (obj: { WorkflowID: string; NodeName: string }) => [
          obj.WorkflowID,
          obj.NodeName,
        ]
      )
    );

    return workflowTypesList;
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(`${e.message}: ${e.response?.statusText}`);
  }
};
