import dotenv from "dotenv";

dotenv.config();

interface RequestDataParams {
  id?: number | undefined;
  workflowSpecification?: string;
  requestValues?: string;
}

interface ConfigurationFieldsParams {
  workflowID: number;
  workflowVariantID: number;
}

interface ListOfStepsRequestParams {
  id?: number | undefined;
}

interface RequestDataOnStepParams {
  id?: number | undefined;
  stepID?: number | undefined;
}

interface RequestListOfFilesParams {
  id?: number | undefined;
  stepID?: number | undefined;
}

interface RequestGetFileParams {
  id: string | undefined;
}

//The function responsible for retrieving the initial request data
const requestDataQuery = (params: RequestDataParams) => {
  const conditions: string[] = [];

  if (params.id !== undefined) {
    conditions.push(`R.RequestID = ${params.id}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const requestDataQuery = `
    SELECT R.RequestID,
	    W.FormSpecification,
      R.ControlData,
      R.FormData,
      R.InitialFormData
    FROM WorkflowRuntime.Request R
    INNER JOIN WorkflowSpecification.Workflow W ON R.WorkflowID = W.WorkflowID AND R.WorkflowVariantID = W.WorkflowVariantID 
    ${whereClause}
    ORDER BY R.RequestID ASC`;
  return requestDataQuery;
};

//The function responsible for retrieving the configuration fields labels
const configurationFieldsQuery = (params: ConfigurationFieldsParams) => {
  const conditions: string[] = [];

  if (params.workflowVariantID !== undefined) {
    conditions.push(`WorkflowVariantID = ${params.workflowVariantID}`);
  }

  if (params.workflowID !== undefined) {
    conditions.push(`WorkflowID = ${params.workflowID}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const requestDataQuery = `
    SELECT Type,
    ID,
    Text
    FROM WorkflowSpecification.WorkflowText
    ${whereClause}`;
  return requestDataQuery;
};

//The function responsible for retrieving all the steps the request has gone through
const listOfStepsRequestQuery = (params: ListOfStepsRequestParams) => {
  const conditions: string[] = [];

  if (params.id !== undefined) {
    conditions.push(`R.RequestID = ${params.id}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const listOfStepsRequestQuery = `
    SELECT R.RequestID,
	  R.ControlData.value('(/ControlData/WorkflowID/node())[1]','varchar(250)') AS WorkflowID,
	  R.ControlData.value('(/ControlData/WorkflowVariantID/node())[1]','varchar(250)') AS WorkflowVariantID,
	  R.WorkflowTransitionID,
	  W.WorkflowTransitionName,
    R.RequestActivityID
    FROM WorkflowRuntime.RequestActivity R
    INNER JOIN WorkflowSpecification.WorkflowTransition W ON
      R.ControlData.value('(/ControlData/WorkflowID/node())[1]','varchar(250)') = W.WorkflowID 
      AND R.ControlData.value('(/ControlData/WorkflowVariantID/node())[1]','varchar(250)') = W.WorkflowVariantID
      AND R.WorkflowTransitionID = W.WorkflowTransitionID
    ${whereClause}
    ORDER BY R.RequestID ASC`;
  return listOfStepsRequestQuery;
};

//The function responsible for retrieving the request data from selected step
const requestDataOnStepsQuery = (params: RequestDataOnStepParams) => {
  const conditions: string[] = [];

  if (params.id !== undefined) {
    conditions.push(`R.RequestID = ${params.id}`);
  }

  if (params.stepID !== undefined) {
    conditions.push(`R.RequestActivityID = ${params.stepID}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const requestDataOnStepsQuery = `
    SELECT
	  W.FormSpecification,
	  R.FormDataEnd,
    R.FormDataStart,
    R.ControlData,
	  R2.InitialFormData
    FROM WorkflowRuntime.RequestActivity R
    LEFT JOIN WorkflowSpecification.Workflow W ON R.ControlData.value('(/ControlData/WorkflowID/node())[1]','varchar(250)') = W.WorkflowID 
      AND R.ControlData.value('(/ControlData/WorkflowVariantID/node())[1]','varchar(250)') = W.WorkflowVariantID 
    LEFT JOIN WorkflowRuntime.Request R2 ON R.RequestID = R2.RequestID
	  ${whereClause}
    ORDER BY R.RequestID ASC`;
  return requestDataOnStepsQuery;
};

//The function responsible for retrieving list of files on initial view
const requestListOfFilesQuery = (params: RequestListOfFilesParams) => {
  const conditions: string[] = [];

  if (params.id !== undefined) {
    conditions.push(`RequestID = ${params.id}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const requestListOfFilesQuery = `
    SELECT 
      ValueNode.value('(text())[1]', 'varchar(250)') AS FileUUID,
      FileTable.Filename
    FROM [${process.env.DB_REQUEST_DATA_DB_ADRESS}].[WorkflowRuntime].[Request]
    CROSS APPLY FormData.nodes('/FormData/Field[@ID="REQUEST_DATA_SUPPORTING_DOCUMENTS"]/Value') AS FieldNodes(ValueNode)
    LEFT JOIN [${process.env.DB_FILE_DB_ADRESS}].[Storage].[File] AS FileTable
        ON ValueNode.value('(text())[1]', 'varchar(250)') = FileTable.FileUUID
	  ${whereClause}`;

  return requestListOfFilesQuery;
};

//The function responsible for retrieving the request data from selected step
const requestListOfFilesQueryOnStep = (params: RequestListOfFilesParams) => {
  const conditions: string[] = [];

  if (params.id !== undefined) {
    conditions.push(`RequestID = ${params.id}`);
  }

  if (params.stepID !== undefined) {
    conditions.push(`RequestActivityID = ${params.stepID}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const requestListOfFilesQueryOnStep = `
    SELECT 
      ValueNode.value('(text())[1]', 'varchar(250)') AS FileUUID,
      FileTable.Filename
    FROM [${process.env.DB_REQUEST_DATA_DB_ADRESS}].[WorkflowRuntime].[RequestActivity]
    CROSS APPLY FormDataEnd.nodes('/FormData/Field[@ID="REQUEST_DATA_SUPPORTING_DOCUMENTS"]/Value') AS FieldNodes(ValueNode)
    LEFT JOIN [${process.env.DB_FILE_DB_ADRESS}].[Storage].[File] AS FileTable
        ON ValueNode.value('(text())[1]', 'varchar(250)') = FileTable.FileUUID
	  ${whereClause}`;

  return requestListOfFilesQueryOnStep;
};

//The function responsible for get file from database
const requestGetFileQuery = (params: RequestGetFileParams) => {
  const conditions: string[] = [];

  if (params.id !== undefined) {
    conditions.push(`FileUUID = '${params.id}'`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const requestGetFileQuery = `
    SELECT  
      MimeType,
      [File]
    FROM Storage.[File]
	  ${whereClause}`;

  return requestGetFileQuery;
};

export {
  requestDataQuery,
  RequestDataParams,
  listOfStepsRequestQuery,
  ListOfStepsRequestParams,
  requestDataOnStepsQuery,
  RequestDataOnStepParams,
  requestListOfFilesQueryOnStep,
  requestListOfFilesQuery,
  RequestListOfFilesParams,
  requestGetFileQuery,
  RequestGetFileParams,
  configurationFieldsQuery,
  ConfigurationFieldsParams,
};
