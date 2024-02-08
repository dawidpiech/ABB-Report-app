interface RequestsListQueryParams {
  id?: number | boolean;
  companyName?: string;
  requestTitle?: string;
  requestorName?: string;
  email?: string;
  page: number;
  requestOpenedStartDate?: Date | boolean;
  requestOpenedEndDate?: Date | boolean;
  requestClosedStartDate?: Date | boolean;
  requestClosedEndDate?: Date | boolean;
}

const ListOfRequestsQuery = (params: RequestsListQueryParams) => {
  const conditions: string[] = [];

  if (params.id !== undefined) {
    conditions.push(`RequestID = ${params.id}`);
  }

  if (params.requestorName !== undefined) {
    conditions.push(`RequestorName LIKE '%${params.requestorName}%'`);
  }

  if (params.email !== undefined) {
    conditions.push(`RequestorEmail LIKE '%${params.email}%'`);
  }

  if (params.companyName !== undefined) {
    conditions.push(`CompanyName LIKE '%${params.companyName}%'`);
  }

  if (params.requestTitle !== undefined) {
    conditions.push(`RequestTitle LIKE '%${params.requestTitle}%'`);
  }

  // Warunek dla daty otwarcia
  if (
    params.requestOpenedStartDate !== undefined &&
    params.requestOpenedEndDate !== undefined
  ) {
    conditions.push(
      `OpenedAt ${
        params.requestOpenedStartDate && params.requestOpenedEndDate
          ? "BETWEEN"
          : params.requestOpenedStartDate
          ? ">="
          : "<="
      } '${params.requestOpenedStartDate}'${
        params.requestOpenedEndDate
          ? ` AND '${params.requestOpenedEndDate}'`
          : ""
      }`
    );
  }

  // Warunek dla daty zamknięcia
  if (
    params.requestClosedStartDate !== undefined &&
    params.requestClosedEndDate !== undefined
  ) {
    conditions.push(
      `OpenedAt ${
        params.requestClosedStartDate !== undefined &&
        params.requestClosedEndDate !== undefined
          ? "BETWEEN"
          : params.requestClosedStartDate
          ? ">="
          : "<="
      } '${params.requestClosedStartDate}'${
        params.requestClosedEndDate
          ? ` AND '${params.requestClosedEndDate}'`
          : ""
      }`
    );
  }

  const whereClause =
    conditions.length > 0 ? `AND ${conditions.join(" AND ")}` : "";

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
      )
      SELECT
        ID,
        RequestID,
        WorkflowTypeID,
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
        ID BETWEEN ${params.page * 100 - 100} AND ${params.page * 100}
        ${whereClause}
      ORDER BY RequestID ASC`;
  return listOfRequestsQuery;
};

export { ListOfRequestsQuery, RequestsListQueryParams };
