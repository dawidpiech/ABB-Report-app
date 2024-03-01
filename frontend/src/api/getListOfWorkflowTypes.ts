import axios from "axios";
import { WorkFlowTypesList } from "../components/SearchForm/SearchForm";

interface WorkflowData {
  WorkflowID: string;
  NodeName: string;
}

export const getListOfWorkflowTypes = async () => {
  try {
    const workflowTypes = await axios.get<WorkflowData[]>(
      "http://localhost:3000/api/list/getListOfWorkflows"
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
    console.log("Błąd podczas pobierania danych z API", error);
  }
};
