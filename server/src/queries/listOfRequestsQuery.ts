interface RequestsListQueryParams {
  id?: number;
  sapCode?: string;
  requestorName?: string;
  email?: string;
  page: number;
  workflowType?: number;
  requestOpenedStartDate?: Date | boolean;
  requestOpenedEndDate?: Date | boolean;
  requestClosedStartDate?: Date | boolean;
  requestClosedEndDate?: Date | boolean;
}

const listOfRequestsQuery = (params: RequestsListQueryParams) => {
  const conditions: string[] = [];

  // Condition for request ID
  if (params.id !== undefined) {
    conditions.push(`R.RequestID = ${params.id}`);
  }

  // Condition for type of workflow
  if (params.workflowType !== undefined) {
    conditions.push(`R.WorkflowID = ${params.workflowType}`);
  }

  // Condition for restor name
  if (params.sapCode !== undefined) {
    conditions.push(
      `R.FormData.value('(/FormData/Field[@ID="REQUEST_DECISION_SAP_SYSTEM"]/Value/node())[1]','varchar(250)') LIKE '${params.sapCode}'`
    );
  }

  // Condition for restor name
  if (params.requestorName !== undefined) {
    conditions.push(`U.DisplayName LIKE '%${params.requestorName}%'`);
  }

  // Condition for requestor e-mail
  if (params.email !== undefined) {
    conditions.push(`U.EMail LIKE '%${params.email}%'`);
  }

  // Condition for request opening date
  if (
    params.requestOpenedStartDate !== undefined &&
    params.requestOpenedEndDate !== undefined
  ) {
    conditions.push(
      `R.OpenedAt BETWEEN '${params.requestOpenedStartDate}' AND '${params.requestOpenedEndDate}'`
    );
  } else if (params.requestOpenedStartDate !== undefined) {
    conditions.push(`R.OpenedAt > '${params.requestOpenedStartDate}'`);
  } else if (params.requestOpenedEndDate !== undefined) {
    conditions.push(`R.OpenedAt < '${params.requestOpenedEndDate}'`);
  }

  // Condition for request closed date
  if (
    params.requestClosedStartDate !== undefined &&
    params.requestClosedEndDate !== undefined
  ) {
    conditions.push(
      `R.ClosedAt BETWEEN '${params.requestClosedStartDate}' AND '${params.requestClosedEndDate}'`
    );
  } else if (params.requestClosedStartDate !== undefined) {
    conditions.push(`R.ClosedAt > '${params.requestClosedStartDate}'`);
  } else if (params.requestClosedEndDate !== undefined) {
    conditions.push(`R.ClosedAt < '${params.requestClosedEndDate}'`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const listOfRequestsQuery = `WITH Records AS (
      SELECT 
        ROW_NUMBER() OVER (ORDER BY R.RequestID DESC) AS ID,
        R.RequestID,
        R.WorkflowID AS WorkflowTypeID,
        W.NodeName AS WorkflowName,
        R.FormData.value('(/FormData/Field[@ID="REQUEST_DATA_REQUEST_TITLE"]/Value/node())[1]','varchar(250)') AS RequestTitle,
        R.FormData.value('(/FormData/Field[@ID="MD_ADDR1_DATA__NAME1"]/Value/node())[1]','varchar(250)') AS CompanyName,
        R.FormData.value('(/FormData/Field[@ID="REQUEST_DECISION_SAP_SYSTEM"]/Value/node())[1]','varchar(250)') AS SAPCode,
        U.DisplayName AS RequestorName,
        U.EMail AS RequestorEmail,
        R.FinalStatus AS RequestStatus,
        R.OpenedAt,
        R.ClosedAt
      FROM 
        WorkflowRuntime.Request R
      LEFT JOIN 
        ApplicationAdministration.[User] U ON R.OpenedBy = U.ID
      LEFT JOIN 
        WorkflowSpecification.WorkflowTree W ON R.WorkflowID = W.NodeID
      ${whereClause}
      )
      SELECT
        ID,
        RequestID,
        WorkflowTypeID,
        SAPCode,
        WorkflowName,
        RequestTitle,
        CompanyName,
        RequestorName,
        RequestorEmail,
        OpenedAt,
        ClosedAt
      FROM 
        Records
      WHERE 
        ID BETWEEN ${params.page * 100 - 99} AND ${params.page * 100}
      `;
  return listOfRequestsQuery;
};

//The function responsible for get SAP Country codes
const listOfSapCodes = () => {
  const listOfSapCodesQuery = `
    SELECT CountryID,
       CountryName
    FROM CustomerSpecific.OrganizationCountry`;

  return listOfSapCodesQuery;
};

//The function responsible for get list of workflows
const listOfWorkflows = () => {
  const listOfWorkflowsQuery = `
    SELECT WorkflowID,
       NodeName
    FROM WorkflowSpecification.WorkflowTree
    WHERE WorkflowID IS NOT NULL`;

  return listOfWorkflowsQuery;
};

//The function responsible for get count of requests
const countRequestsQuery = (params: RequestsListQueryParams) => {
  const conditions: string[] = [];

  // Condition for request ID
  if (params.id !== undefined) {
    conditions.push(`R.RequestID = ${params.id}`);
  }

  // Condition for type of workflow
  if (params.workflowType !== undefined) {
    conditions.push(`R.WorkflowID = ${params.workflowType}`);
  }

  // Condition for restor name
  if (params.sapCode !== undefined) {
    conditions.push(
      `R.FormData.value('(/FormData/Field[@ID="REQUEST_DECISION_SAP_SYSTEM"]/Value/node())[1]','varchar(250)') LIKE '${params.sapCode}'`
    );
  }

  // Condition for restor name
  if (params.requestorName !== undefined) {
    conditions.push(`U.DisplayName LIKE '%${params.requestorName}%'`);
  }

  // Condition for requestor e-mail
  if (params.email !== undefined) {
    conditions.push(`U.EMail LIKE '%${params.email}%'`);
  }

  // Condition for request opening date
  if (
    params.requestOpenedStartDate !== undefined &&
    params.requestOpenedEndDate !== undefined
  ) {
    conditions.push(
      `R.OpenedAt BETWEEN '${params.requestOpenedStartDate}' AND '${params.requestOpenedEndDate}'`
    );
  } else if (params.requestOpenedStartDate !== undefined) {
    conditions.push(`R.OpenedAt > '${params.requestOpenedStartDate}'`);
  } else if (params.requestOpenedEndDate !== undefined) {
    conditions.push(`R.OpenedAt < '${params.requestOpenedEndDate}'`);
  }

  // Condition for request closed date
  if (
    params.requestClosedStartDate !== undefined &&
    params.requestClosedEndDate !== undefined
  ) {
    conditions.push(
      `R.ClosedAt BETWEEN '${params.requestClosedStartDate}' AND '${params.requestClosedEndDate}'`
    );
  } else if (params.requestClosedStartDate !== undefined) {
    conditions.push(`R.ClosedAt > '${params.requestClosedStartDate}'`);
  } else if (params.requestClosedEndDate !== undefined) {
    conditions.push(`R.ClosedAt < '${params.requestClosedEndDate}'`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const countRequestsQuery = `SELECT 
        COUNT(R.RequestID) AS COUNT
      FROM 
        WorkflowRuntime.Request R
      LEFT JOIN 
        ApplicationAdministration.[User] U ON R.OpenedBy = U.ID
      LEFT JOIN 
        WorkflowSpecification.WorkflowTree W ON R.WorkflowID = W.NodeID
      ${whereClause}`;

  return countRequestsQuery;
};

export {
  listOfRequestsQuery,
  RequestsListQueryParams,
  listOfSapCodes,
  listOfWorkflows,
  countRequestsQuery,
};
