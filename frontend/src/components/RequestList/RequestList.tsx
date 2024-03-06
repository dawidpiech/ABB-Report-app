import { useEffect, useState } from "react";
import {
  StyledLink,
  StyledTable,
  StyledTableWrapper,
  StyledTbody,
  StyledTd,
  StyledTh,
  StyledThead,
  StyledTr,
} from "./RequestList.styles";
import { useNavigate, useLocation } from "react-router-dom";
import { getListOfRequests, Request } from "../../api/getListOfRequets";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { format } from "date-fns";
import { Pagination } from "../Pagination/Pagination";

export const RequestList = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const tableHeadings: string[] = [
    "Request ID",
    "Company name",
    "WorkflowName",
    "Requestor email",
    "Requestor name",
    "Submitted on",
    "Closed on",
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getListOfRequests(searchParams);

      if (response) {
        setRequests(response.data.requests);
        setCounter(response.data.count);
      } else {
        setRequests([]);
        setCounter(0);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [navigate, location.search, location.pathname]);

  return (
    <>
      <StyledTableWrapper>
        <StyledTable>
          <StyledThead>
            <StyledTr key="thead" $background={false}>
              {tableHeadings.map((e, index) => (
                <StyledTh key={`th-${index}`}>{e}</StyledTh>
              ))}
            </StyledTr>
          </StyledThead>
          <StyledTbody>
            {isLoading ? (
              <StyledTr key="Loading spinner" $background={false}>
                <StyledTd colSpan={6}>
                  <LoadingSpinner version="top" zindex={999}></LoadingSpinner>
                </StyledTd>
              </StyledTr>
            ) : (
              requests.map((e, index) => (
                <StyledTr
                  key={`row-${index}`}
                  $background={index % 2 === 0 ? true : false}
                >
                  <StyledTd>
                    <StyledLink to={`request/${e.RequestID}`}>
                      {e.RequestID}{" "}
                    </StyledLink>
                  </StyledTd>
                  <StyledTd>{e.CompanyName}</StyledTd>
                  <StyledTd>{e.WorkflowName}</StyledTd>
                  <StyledTd>{e.RequestorEmail}</StyledTd>
                  <StyledTd>{e.RequestorName}</StyledTd>
                  <StyledTd>
                    {e.OpenedAt ? format(e.OpenedAt, "yyyy-MM-dd") : ""}
                  </StyledTd>
                  <StyledTd>
                    {e.ClosedAt ? format(e.ClosedAt, "yyyy-MM-dd") : ""}
                  </StyledTd>
                </StyledTr>
              ))
            )}
          </StyledTbody>
        </StyledTable>
      </StyledTableWrapper>
      {requests.length > 0 && !isLoading ? (
        <Pagination
          totalPages={Math.ceil(counter / 100)}
          isLoading={isLoading}
        ></Pagination>
      ) : (
        ""
      )}
    </>
  );
};
