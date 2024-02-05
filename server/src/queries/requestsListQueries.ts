interface RquestsListQueryParams {
  id?: number;
  requestorName?: string;
  email?: string;
  page: number;
  requestOpenedStartDate?: Date;
  requestOpenedEndDate?: Date;
  requestClosedStartDate?: Date;
  requestClosedEndDate?: Date;
}

const ListOfRequestsQuery = (params: RquestsListQueryParams) => {
  const conditions: string[] = [];

  if (params.id !== undefined) {
    conditions.push(`R.RequestID = ${params.id}`);
  }

  if (params.requestorName !== undefined) {
    conditions.push(`U.DisplayName LIKE '%${params.requestorName}%'`);
  }

  if (params.email !== undefined) {
    conditions.push(`U.EMail LIKE '%${params.email}%'`);
  }

  if (
    params.requestOpenedStartDate !== undefined &&
    params.requestOpenedStartDate <= params.requestOpenedEndDate
  ) {
    conditions.push(`email = '${params.email}'`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const listOfRequestsQuery = `WITH Records AS (
      SELECT 
        ROW_NUMBER() OVER (ORDER BY R.RequestID ASC) AS ID,
        R.RequestID,
        R.WorkflowID AS WorkflowTypeID,
        W.NodeName AS WorkflowName,
        R.FormData.value('(/FormData/Field[@ID="REQUEST_DATA_REQUEST_TITLE"]/Value/node())[1]','varchar(250)') AS RequestTitle,
        R.FormData.value('(/FormData/Field[@ID="MD_ADDR1_DATA__NAME1"]/Value/node())[1]','varchar(250)') AS CompanyName,
        U.DisplayName AS RequestorName,
        U.EMail AS RequestorEmail,
        R.FinalStatus AS RequestStatus,
        R.OpenedAt,
        R.ClosedAt
      FROM 
        WorkflowRuntime.Request R
      INNER JOIN 
        ApplicationAdministration.[User] U ON R.OpenedBy = U.ID
      INNER JOIN 
        WorkflowSpecification.WorkflowTree W ON R.WorkflowID = W.NodeID
      ${whereClause}
      )
      SELECT
        ID,
        RequestID,
        WorkflowTypeID,
        WorkflowName,
        RequestTitle,
        CompanyName,
        RequestorName,
        OpenedAt,
        ClosedAt
      FROM 
        Records
      WHERE 
        ID BETWEEN ${params.page * 100 - 100} AND ${params.page * 100}
      ORDER BY RequestID ASC`;

  return listOfRequestsQuery;
};

export { ListOfRequestsQuery, RquestsListQueryParams };
